import { GraphQLError } from "../../error/GraphQLError.mjs";
import { Kind } from "../../language/kinds.mjs";
import { collectFields } from "../../execution/collectFields.mjs";
function toNodes(fieldDetailsList) {
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
export function SingleFieldSubscriptionsRule(context) {
    return {
        OperationDefinition(node) {
            if (node.operation === 'subscription') {
                const schema = context.getSchema();
                const subscriptionType = schema.getSubscriptionType();
                if (subscriptionType) {
                    const operationName = node.name ? node.name.value : null;
                    const variableValues = Object.create(null);
                    const document = context.getDocument();
                    const fragments = Object.create(null);
                    for (const definition of document.definitions) {
                        if (definition.kind === Kind.FRAGMENT_DEFINITION) {
                            fragments[definition.name.value] = { definition };
                        }
                    }
                    const { groupedFieldSet } = collectFields(schema, fragments, variableValues, subscriptionType, node.selectionSet, context.hideSuggestions);
                    if (groupedFieldSet.size > 1) {
                        const fieldDetailsLists = [...groupedFieldSet.values()];
                        const extraFieldDetailsLists = fieldDetailsLists.slice(1);
                        const extraFieldSelections = extraFieldDetailsLists.flatMap((fieldDetailsList) => toNodes(fieldDetailsList));
                        context.reportError(new GraphQLError(operationName != null
                            ? `Subscription "${operationName}" must select only one top level field.`
                            : 'Anonymous Subscription must select only one top level field.', { nodes: extraFieldSelections }));
                    }
                    for (const fieldDetailsList of groupedFieldSet.values()) {
                        const fieldName = toNodes(fieldDetailsList)[0].name.value;
                        if (fieldName.startsWith('__')) {
                            context.reportError(new GraphQLError(operationName != null
                                ? `Subscription "${operationName}" must not select an introspection top level field.`
                                : 'Anonymous Subscription must not select an introspection top level field.', { nodes: toNodes(fieldDetailsList) }));
                        }
                    }
                }
            }
        },
    };
}
//# sourceMappingURL=SingleFieldSubscriptionsRule.js.map