import type { ObjMap } from '../../jsutils/ObjMap.ts';
import { GraphQLError } from '../../error/GraphQLError.ts';
import type { FieldNode, OperationDefinitionNode } from '../../language/ast.ts';
import { Kind } from '../../language/kinds.ts';
import type { ASTVisitor } from '../../language/visitor.ts';
import type {
  FieldDetailsList,
  FragmentDetails,
} from '../../execution/collectFields.ts';
import { collectFields } from '../../execution/collectFields.ts';
import type { VariableValues } from '../../execution/values.ts';
import type { ValidationContext } from '../ValidationContext.ts';
function toNodes(fieldDetailsList: FieldDetailsList): ReadonlyArray<FieldNode> {
  return fieldDetailsList.map((fieldDetails) => fieldDetails.node);
}
/**
 * Subscriptions must only include a non-introspection field.
 *
 * A GraphQL subscription is valid only if it contains a single root field and
 * that root field is not an introspection field.
 *
 * See https://spec.graphql.org/draft/#sec-Single-root-field
 */
export function SingleFieldSubscriptionsRule(
  context: ValidationContext,
): ASTVisitor {
  return {
    OperationDefinition(node: OperationDefinitionNode) {
      if (node.operation === 'subscription') {
        const schema = context.getSchema();
        const subscriptionType = schema.getSubscriptionType();
        if (subscriptionType) {
          const operationName = node.name ? node.name.value : null;
          const variableValues: VariableValues = Object.create(null);
          const document = context.getDocument();
          const fragments: ObjMap<FragmentDetails> = Object.create(null);
          for (const definition of document.definitions) {
            if (definition.kind === Kind.FRAGMENT_DEFINITION) {
              fragments[definition.name.value] = { definition };
            }
          }
          const { groupedFieldSet } = collectFields(
            schema,
            fragments,
            variableValues,
            subscriptionType,
            node,
          );
          if (groupedFieldSet.size > 1) {
            const fieldDetailsLists = [...groupedFieldSet.values()];
            const extraFieldDetailsLists = fieldDetailsLists.slice(1);
            const extraFieldSelections = extraFieldDetailsLists.flatMap(
              (fieldDetailsList) => toNodes(fieldDetailsList),
            );
            context.reportError(
              new GraphQLError(
                operationName != null
                  ? `Subscription "${operationName}" must select only one top level field.`
                  : 'Anonymous Subscription must select only one top level field.',
                { nodes: extraFieldSelections },
              ),
            );
          }
          for (const fieldDetailsList of groupedFieldSet.values()) {
            const fieldName = toNodes(fieldDetailsList)[0].name.value;
            if (fieldName.startsWith('__')) {
              context.reportError(
                new GraphQLError(
                  operationName != null
                    ? `Subscription "${operationName}" must not select an introspection top level field.`
                    : 'Anonymous Subscription must not select an introspection top level field.',
                  { nodes: toNodes(fieldDetailsList) },
                ),
              );
            }
          }
        }
      }
    },
  };
}
