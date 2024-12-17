import type { Maybe } from '../jsutils/Maybe.js';
import type { ObjMap } from '../jsutils/ObjMap.js';
import type { Path } from '../jsutils/Path.js';
import type { PromiseOrValue } from '../jsutils/PromiseOrValue.js';
import type { ConstValueNode, EnumTypeDefinitionNode, EnumTypeExtensionNode, EnumValueDefinitionNode, FieldDefinitionNode, FieldNode, FragmentDefinitionNode, InputObjectTypeDefinitionNode, InputObjectTypeExtensionNode, InputValueDefinitionNode, InterfaceTypeDefinitionNode, InterfaceTypeExtensionNode, ObjectTypeDefinitionNode, ObjectTypeExtensionNode, OperationDefinitionNode, ScalarTypeDefinitionNode, ScalarTypeExtensionNode, UnionTypeDefinitionNode, UnionTypeExtensionNode, ValueNode } from '../language/ast.js';
import type { GraphQLVariableSignature } from '../execution/getVariableSignature.js';
import type { VariableValues } from '../execution/values.js';
import type { GraphQLDirective } from './directives.js';
import type { GraphQLSchema } from './schema.js';
/**
 * These are all of the possible kinds of types.
 */
export type GraphQLType = GraphQLNamedType | GraphQLWrappingType;
export declare function isType(type: unknown): type is GraphQLType;
export declare function assertType(type: unknown): GraphQLType;
/**
 * There are predicates for each GraphQL schema element.
 */
export declare function isScalarType(type: unknown): type is GraphQLScalarType;
export declare function assertScalarType(type: unknown): GraphQLScalarType;
export declare function isObjectType(type: unknown): type is GraphQLObjectType;
export declare function assertObjectType(type: unknown): GraphQLObjectType;
export declare function isField(field: unknown): field is GraphQLField;
export declare function assertField(field: unknown): GraphQLField;
export declare function isArgument(arg: unknown): arg is GraphQLArgument;
export declare function assertArgument(arg: unknown): GraphQLArgument;
export declare function isInterfaceType(type: unknown): type is GraphQLInterfaceType;
export declare function assertInterfaceType(type: unknown): GraphQLInterfaceType;
export declare function isUnionType(type: unknown): type is GraphQLUnionType;
export declare function assertUnionType(type: unknown): GraphQLUnionType;
export declare function isEnumType(type: unknown): type is GraphQLEnumType;
export declare function assertEnumType(type: unknown): GraphQLEnumType;
export declare function isEnumValue(value: unknown): value is GraphQLEnumValue;
export declare function assertEnumValue(value: unknown): GraphQLEnumValue;
export declare function isInputObjectType(type: unknown): type is GraphQLInputObjectType;
export declare function assertInputObjectType(type: unknown): GraphQLInputObjectType;
export declare function isInputField(field: unknown): field is GraphQLInputField;
export declare function assertInputField(field: unknown): GraphQLInputField;
export declare function isListType(type: GraphQLInputType): type is GraphQLList<GraphQLInputType>;
export declare function isListType(type: GraphQLOutputType): type is GraphQLList<GraphQLOutputType>;
export declare function isListType(type: unknown): type is GraphQLList<GraphQLType>;
export declare function assertListType(type: unknown): GraphQLList<GraphQLType>;
export declare function isNonNullType(type: GraphQLInputType): type is GraphQLNonNull<GraphQLNullableInputType>;
export declare function isNonNullType(type: GraphQLOutputType): type is GraphQLNonNull<GraphQLNullableOutputType>;
export declare function isNonNullType(type: unknown): type is GraphQLNonNull<GraphQLNullableType>;
export declare function assertNonNullType(type: unknown): GraphQLNonNull<GraphQLNullableType>;
/**
 * These types may be used as input types for arguments and directives.
 */
export type GraphQLNullableInputType = GraphQLNamedInputType | GraphQLList<GraphQLInputType>;
export type GraphQLInputType = GraphQLNullableInputType | GraphQLNonNull<GraphQLNullableInputType>;
export declare function isInputType(type: unknown): type is GraphQLInputType;
export declare function assertInputType(type: unknown): GraphQLInputType;
/**
 * These types may be used as output types as the result of fields.
 */
export type GraphQLNullableOutputType = GraphQLNamedOutputType | GraphQLList<GraphQLOutputType>;
export type GraphQLOutputType = GraphQLNullableOutputType | GraphQLNonNull<GraphQLNullableOutputType>;
export declare function isOutputType(type: unknown): type is GraphQLOutputType;
export declare function assertOutputType(type: unknown): GraphQLOutputType;
/**
 * These types may describe types which may be leaf values.
 */
export type GraphQLLeafType = GraphQLScalarType | GraphQLEnumType;
export declare function isLeafType(type: unknown): type is GraphQLLeafType;
export declare function assertLeafType(type: unknown): GraphQLLeafType;
/**
 * These types may describe the parent context of a selection set.
 */
export type GraphQLCompositeType = GraphQLObjectType | GraphQLInterfaceType | GraphQLUnionType;
export declare function isCompositeType(type: unknown): type is GraphQLCompositeType;
export declare function assertCompositeType(type: unknown): GraphQLCompositeType;
/**
 * These types may describe the parent context of a selection set.
 */
export type GraphQLAbstractType = GraphQLInterfaceType | GraphQLUnionType;
export declare function isAbstractType(type: unknown): type is GraphQLAbstractType;
export declare function assertAbstractType(type: unknown): GraphQLAbstractType;
/**
 * List Type Wrapper
 *
 * A list is a wrapping type which points to another type.
 * Lists are often created within the context of defining the fields of
 * an object type.
 *
 * Example:
 *
 * ```ts
 * const PersonType = new GraphQLObjectType({
 *   name: 'Person',
 *   fields: () => ({
 *     parents: { type: new GraphQLList(PersonType) },
 *     children: { type: new GraphQLList(PersonType) },
 *   })
 * })
 * ```
 */
export declare class GraphQLList<T extends GraphQLType> implements GraphQLSchemaElement {
    readonly ofType: T;
    constructor(ofType: T);
    get [Symbol.toStringTag](): string;
    toString(): string;
    toJSON(): string;
}
/**
 * Non-Null Type Wrapper
 *
 * A non-null is a wrapping type which points to another type.
 * Non-null types enforce that their values are never null and can ensure
 * an error is raised if this ever occurs during a request. It is useful for
 * fields which you can make a strong guarantee on non-nullability, for example
 * usually the id field of a database row will never be null.
 *
 * Example:
 *
 * ```ts
 * const RowType = new GraphQLObjectType({
 *   name: 'Row',
 *   fields: () => ({
 *     id: { type: new GraphQLNonNull(GraphQLString) },
 *   })
 * })
 * ```
 * Note: the enforcement of non-nullability occurs within the executor.
 */
export declare class GraphQLNonNull<T extends GraphQLNullableType> implements GraphQLSchemaElement {
    readonly ofType: T;
    constructor(ofType: T);
    get [Symbol.toStringTag](): string;
    toString(): string;
    toJSON(): string;
}
/**
 * These types wrap and modify other types
 */
export type GraphQLWrappingType = GraphQLList<GraphQLType> | GraphQLNonNull<GraphQLNullableType>;
export declare function isWrappingType(type: unknown): type is GraphQLWrappingType;
export declare function assertWrappingType(type: unknown): GraphQLWrappingType;
/**
 * These types can all accept null as a value.
 */
export type GraphQLNullableType = GraphQLNamedType | GraphQLList<GraphQLType>;
export declare function isNullableType(type: unknown): type is GraphQLNullableType;
export declare function assertNullableType(type: unknown): GraphQLNullableType;
export declare function getNullableType(type: undefined | null): void;
export declare function getNullableType<T extends GraphQLNullableType>(type: T | GraphQLNonNull<T>): T;
export declare function getNullableType(type: Maybe<GraphQLType>): GraphQLNullableType | undefined;
/**
 * These named types do not include modifiers like List or NonNull.
 */
export type GraphQLNamedType = GraphQLNamedInputType | GraphQLNamedOutputType;
export type GraphQLNamedInputType = GraphQLScalarType | GraphQLEnumType | GraphQLInputObjectType;
export type GraphQLNamedOutputType = GraphQLScalarType | GraphQLObjectType | GraphQLInterfaceType | GraphQLUnionType | GraphQLEnumType;
export declare function isNamedType(type: unknown): type is GraphQLNamedType;
export declare function assertNamedType(type: unknown): GraphQLNamedType;
export declare function getNamedType(type: undefined | null): void;
export declare function getNamedType(type: GraphQLInputType): GraphQLNamedInputType;
export declare function getNamedType(type: GraphQLOutputType): GraphQLNamedOutputType;
export declare function getNamedType(type: GraphQLType): GraphQLNamedType;
export declare function getNamedType(type: Maybe<GraphQLType>): GraphQLNamedType | undefined;
/**
 * An interface for all Schema Elements.
 */
export interface GraphQLSchemaElement {
    toString: () => string;
    toJSON: () => string;
}
/**
 * Used while defining GraphQL types to allow for circular references in
 * otherwise immutable type definitions.
 */
export type ThunkReadonlyArray<T> = (() => ReadonlyArray<T>) | ReadonlyArray<T>;
export type ThunkObjMap<T> = (() => ObjMap<T>) | ObjMap<T>;
export declare function resolveReadonlyArrayThunk<T>(thunk: ThunkReadonlyArray<T>): ReadonlyArray<T>;
export declare function resolveObjMapThunk<T>(thunk: ThunkObjMap<T>): ObjMap<T>;
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */
export interface GraphQLScalarTypeExtensions {
    [attributeName: string | symbol]: unknown;
}
/**
 * Scalar Type Definition
 *
 * The leaf values of any request and input values to arguments are
 * Scalars (or Enums) and are defined with a name and a series of functions
 * used to parse input from ast or variables and to ensure validity.
 *
 * If a type's coerceOutputValue function returns `null` or does not return a
 * value (i.e. it returns `undefined`) then an error will be raised and a
 * `null` value will be returned in the response. It is always better to
 * validate.
 *
 * Example:
 *
 * ```ts
 * function ensureOdd(value) {
 *   if (!Number.isFinite(value)) {
 *     throw new Error(
 *       `Scalar "Odd" cannot represent "${value}" since it is not a finite number.`,
 *     );
 *   }
 *
 *   if (value % 2 === 0) {
 *     throw new Error(`Scalar "Odd" cannot represent "${value}" since it is even.`);
 *   }
 * }
 *
 * const OddType = new GraphQLScalarType({
 *   name: 'Odd',
 *   coerceOutputValue(value) {
 *     return ensureOdd(value);
 *   },
 *   coerceInputValue(value) {
 *     return ensureOdd(value);
 *   }
 *   valueToLiteral(value) {
 *    return parse(`${ensureOdd(value)`);
 *   }
 * });
 * ```
 *
 * Custom scalars behavior is defined via the following functions:
 *
 *  - coerceOutputValue(value): Implements "Result Coercion". Given an internal value,
 *    produces an external value valid for this type. Returns undefined or
 *    throws an error to indicate invalid values.
 *
 *  - coerceInputValue(value): Implements "Input Coercion" for values. Given an
 *    external value (for example, variable values), produces an internal value
 *    valid for this type. Returns undefined or throws an error to indicate
 *    invalid values.
 *
 *  - coerceInputLiteral(ast): Implements "Input Coercion" for constant literals.
 *    Given an GraphQL literal (AST) (for example, an argument value), produces
 *    an internal value valid for this type. Returns undefined or throws an
 *    error to indicate invalid values.
 *
 *  - valueToLiteral(value): Converts an external value to a GraphQL
 *    literal (AST). Returns undefined or throws an error to indicate
 *    invalid values.
 *
 *  Deprecated, to be removed in v18:
 *
 *  - serialize(value): Implements "Result Coercion". Renamed to
 *    `coerceOutputValue()`.
 *
 *  - parseValue(value): Implements "Input Coercion" for values. Renamed to
 *    `coerceInputValue()`.
 *
 *  - parseLiteral(ast): Implements "Input Coercion" for literals including
 *    non-specified replacement of variables embedded within complex scalars.
 *    Replaced by the combination of the `replaceVariables()` utility and the
 *    `coerceInputLiteral()` method.
 *
 */
export declare class GraphQLScalarType<TInternal = unknown, TExternal = TInternal> implements GraphQLSchemaElement {
    name: string;
    description: Maybe<string>;
    specifiedByURL: Maybe<string>;
    /** @deprecated use `coerceOutputValue()` instead, `serialize()` will be removed in v18 */
    serialize: GraphQLScalarSerializer<TExternal>;
    /** @deprecated use `coerceInputValue()` instead, `parseValue()` will be removed in v18 */
    parseValue: GraphQLScalarValueParser<TInternal>;
    /** @deprecated use `replaceVariables()` and `coerceInputLiteral()` instead, `parseLiteral()` will be removed in v18 */
    parseLiteral: GraphQLScalarLiteralParser<TInternal>;
    coerceOutputValue: GraphQLScalarOutputValueCoercer<TExternal>;
    coerceInputValue: GraphQLScalarInputValueCoercer<TInternal>;
    coerceInputLiteral: GraphQLScalarInputLiteralCoercer<TInternal> | undefined;
    valueToLiteral: GraphQLScalarValueToLiteral | undefined;
    extensions: Readonly<GraphQLScalarTypeExtensions>;
    astNode: Maybe<ScalarTypeDefinitionNode>;
    extensionASTNodes: ReadonlyArray<ScalarTypeExtensionNode>;
    constructor(config: Readonly<GraphQLScalarTypeConfig<TInternal, TExternal>>);
    get [Symbol.toStringTag](): string;
    toConfig(): GraphQLScalarTypeNormalizedConfig<TInternal, TExternal>;
    toString(): string;
    toJSON(): string;
}
export type GraphQLScalarSerializer<TExternal> = (outputValue: unknown) => TExternal;
export type GraphQLScalarOutputValueCoercer<TExternal> = (outputValue: unknown) => TExternal;
export type GraphQLScalarValueParser<TInternal> = (inputValue: unknown) => TInternal;
export type GraphQLScalarInputValueCoercer<TInternal> = (inputValue: unknown) => TInternal;
export type GraphQLScalarLiteralParser<TInternal> = (valueNode: ValueNode, variables: Maybe<ObjMap<unknown>>) => Maybe<TInternal>;
export type GraphQLScalarInputLiteralCoercer<TInternal> = (valueNode: ConstValueNode) => Maybe<TInternal>;
export type GraphQLScalarValueToLiteral = (inputValue: unknown) => ConstValueNode | undefined;
export interface GraphQLScalarTypeConfig<TInternal, TExternal> {
    name: string;
    description?: Maybe<string>;
    specifiedByURL?: Maybe<string>;
    /** Serializes an internal value to include in a response. */
    /** @deprecated use `coerceOutputValue()` instead, `serialize()` will be removed in v18 */
    serialize?: GraphQLScalarSerializer<TExternal> | undefined;
    /** Parses an externally provided value to use as an input. */
    /** @deprecated use `coerceInputValue()` instead, `parseValue()` will be removed in v18 */
    parseValue?: GraphQLScalarValueParser<TInternal> | undefined;
    /** Parses an externally provided literal value to use as an input. */
    /** @deprecated use `replaceVariables()` and `coerceInputLiteral()` instead, `parseLiteral()` will be removed in v18 */
    parseLiteral?: GraphQLScalarLiteralParser<TInternal> | undefined;
    /** Coerces an internal value to include in a response. */
    coerceOutputValue?: GraphQLScalarOutputValueCoercer<TExternal> | undefined;
    /** Coerces an externally provided value to use as an input. */
    coerceInputValue?: GraphQLScalarInputValueCoercer<TInternal> | undefined;
    /** Coerces an externally provided const literal value to use as an input. */
    coerceInputLiteral?: GraphQLScalarInputLiteralCoercer<TInternal> | undefined;
    /** Translates an externally provided value to a literal (AST). */
    valueToLiteral?: GraphQLScalarValueToLiteral | undefined;
    extensions?: Maybe<Readonly<GraphQLScalarTypeExtensions>>;
    astNode?: Maybe<ScalarTypeDefinitionNode>;
    extensionASTNodes?: Maybe<ReadonlyArray<ScalarTypeExtensionNode>>;
}
export interface GraphQLScalarTypeNormalizedConfig<TInternal, TExternal> extends GraphQLScalarTypeConfig<TInternal, TExternal> {
    serialize: GraphQLScalarSerializer<TExternal>;
    parseValue: GraphQLScalarValueParser<TInternal>;
    parseLiteral: GraphQLScalarLiteralParser<TInternal>;
    coerceOutputValue: GraphQLScalarOutputValueCoercer<TExternal>;
    coerceInputValue: GraphQLScalarInputValueCoercer<TInternal>;
    coerceInputLiteral: GraphQLScalarInputLiteralCoercer<TInternal> | undefined;
    extensions: Readonly<GraphQLScalarTypeExtensions>;
    extensionASTNodes: ReadonlyArray<ScalarTypeExtensionNode>;
}
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 *
 * We've provided these template arguments because this is an open type and
 * you may find them useful.
 */
export interface GraphQLObjectTypeExtensions<_TSource = any, _TContext = any> {
    [attributeName: string | symbol]: unknown;
}
/**
 * Object Type Definition
 *
 * Almost all of the GraphQL types you define will be object types. Object types
 * have a name, but most importantly describe their fields.
 *
 * Example:
 *
 * ```ts
 * const AddressType = new GraphQLObjectType({
 *   name: 'Address',
 *   fields: {
 *     street: { type: GraphQLString },
 *     number: { type: GraphQLInt },
 *     formatted: {
 *       type: GraphQLString,
 *       resolve(obj) {
 *         return obj.number + ' ' + obj.street
 *       }
 *     }
 *   }
 * });
 * ```
 *
 * When two types need to refer to each other, or a type needs to refer to
 * itself in a field, you can use a function expression (aka a closure or a
 * thunk) to supply the fields lazily.
 *
 * Example:
 *
 * ```ts
 * const PersonType = new GraphQLObjectType({
 *   name: 'Person',
 *   fields: () => ({
 *     name: { type: GraphQLString },
 *     bestFriend: { type: PersonType },
 *   })
 * });
 * ```
 */
export declare class GraphQLObjectType<TSource = any, TContext = any> implements GraphQLSchemaElement {
    name: string;
    description: Maybe<string>;
    isTypeOf: Maybe<GraphQLIsTypeOfFn<TSource, TContext>>;
    extensions: Readonly<GraphQLObjectTypeExtensions<TSource, TContext>>;
    astNode: Maybe<ObjectTypeDefinitionNode>;
    extensionASTNodes: ReadonlyArray<ObjectTypeExtensionNode>;
    private _fields;
    private _interfaces;
    constructor(config: Readonly<GraphQLObjectTypeConfig<TSource, TContext>>);
    get [Symbol.toStringTag](): string;
    getFields(): GraphQLFieldMap<TSource, TContext>;
    getInterfaces(): ReadonlyArray<GraphQLInterfaceType>;
    toConfig(): GraphQLObjectTypeNormalizedConfig<TSource, TContext>;
    toString(): string;
    toJSON(): string;
}
export interface GraphQLObjectTypeConfig<TSource, TContext> {
    name: string;
    description?: Maybe<string>;
    interfaces?: ThunkReadonlyArray<GraphQLInterfaceType> | undefined;
    fields: ThunkObjMap<GraphQLFieldConfig<TSource, TContext>>;
    isTypeOf?: Maybe<GraphQLIsTypeOfFn<TSource, TContext>>;
    extensions?: Maybe<Readonly<GraphQLObjectTypeExtensions<TSource, TContext>>>;
    astNode?: Maybe<ObjectTypeDefinitionNode>;
    extensionASTNodes?: Maybe<ReadonlyArray<ObjectTypeExtensionNode>>;
}
export interface GraphQLObjectTypeNormalizedConfig<TSource, TContext> extends GraphQLObjectTypeConfig<any, any> {
    interfaces: ReadonlyArray<GraphQLInterfaceType>;
    fields: GraphQLFieldNormalizedConfigMap<any, any>;
    extensions: Readonly<GraphQLObjectTypeExtensions<TSource, TContext>>;
    extensionASTNodes: ReadonlyArray<ObjectTypeExtensionNode>;
}
export type GraphQLTypeResolver<TSource, TContext> = (value: TSource, context: TContext, info: GraphQLResolveInfo, abstractType: GraphQLAbstractType) => PromiseOrValue<string | undefined>;
export type GraphQLIsTypeOfFn<TSource, TContext> = (source: TSource, context: TContext, info: GraphQLResolveInfo) => PromiseOrValue<boolean>;
export type GraphQLFieldResolver<TSource, TContext, TArgs = any, TResult = unknown> = (source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo, abortSignal: AbortSignal | undefined) => TResult;
export interface GraphQLResolveInfo {
    readonly fieldName: string;
    readonly fieldNodes: ReadonlyArray<FieldNode>;
    readonly returnType: GraphQLOutputType;
    readonly parentType: GraphQLObjectType;
    readonly path: Path;
    readonly schema: GraphQLSchema;
    readonly fragments: ObjMap<FragmentDefinitionNode>;
    readonly rootValue: unknown;
    readonly operation: OperationDefinitionNode;
    readonly variableValues: VariableValues;
}
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 *
 * We've provided these template arguments because this is an open type and
 * you may find them useful.
 */
export interface GraphQLFieldExtensions<_TSource, _TContext, _TArgs = any> {
    [attributeName: string | symbol]: unknown;
}
export interface GraphQLFieldConfig<TSource, TContext, TArgs = any> {
    description?: Maybe<string>;
    type: GraphQLOutputType;
    args?: GraphQLFieldConfigArgumentMap | undefined;
    resolve?: GraphQLFieldResolver<TSource, TContext, TArgs> | undefined;
    subscribe?: GraphQLFieldResolver<TSource, TContext, TArgs> | undefined;
    deprecationReason?: Maybe<string>;
    extensions?: Maybe<Readonly<GraphQLFieldExtensions<TSource, TContext, TArgs>>>;
    astNode?: Maybe<FieldDefinitionNode>;
}
export interface GraphQLFieldNormalizedConfig<TSource, TContext, TArgs = any> extends GraphQLFieldConfig<TSource, TContext, TArgs> {
    args: GraphQLFieldNormalizedConfigArgumentMap;
    extensions: Readonly<GraphQLFieldExtensions<TSource, TContext, TArgs>>;
}
export type GraphQLFieldConfigArgumentMap = ObjMap<GraphQLArgumentConfig>;
export type GraphQLFieldNormalizedConfigArgumentMap = ObjMap<GraphQLArgumentNormalizedConfig>;
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */
export interface GraphQLArgumentExtensions {
    [attributeName: string | symbol]: unknown;
}
export interface GraphQLArgumentConfig {
    description?: Maybe<string>;
    type: GraphQLInputType;
    /** @deprecated use default instead, defaultValue will be removed in v18 **/
    defaultValue?: unknown;
    default?: GraphQLDefaultInput | undefined;
    deprecationReason?: Maybe<string>;
    extensions?: Maybe<Readonly<GraphQLArgumentExtensions>>;
    astNode?: Maybe<InputValueDefinitionNode>;
}
export interface GraphQLArgumentNormalizedConfig extends GraphQLArgumentConfig {
    default: GraphQLDefaultInput | undefined;
    extensions: Readonly<GraphQLArgumentExtensions>;
}
export type GraphQLFieldConfigMap<TSource, TContext> = ObjMap<GraphQLFieldConfig<TSource, TContext>>;
export type GraphQLFieldNormalizedConfigMap<TSource, TContext> = ObjMap<GraphQLFieldNormalizedConfig<TSource, TContext>>;
export declare class GraphQLField<TSource = any, TContext = any, TArgs = any> implements GraphQLSchemaElement {
    parentType: GraphQLObjectType<TSource, TContext> | GraphQLInterfaceType<TSource, TContext> | undefined;
    name: string;
    description: Maybe<string>;
    type: GraphQLOutputType;
    args: ReadonlyArray<GraphQLArgument>;
    resolve?: GraphQLFieldResolver<TSource, TContext, TArgs> | undefined;
    subscribe?: GraphQLFieldResolver<TSource, TContext, TArgs> | undefined;
    deprecationReason: Maybe<string>;
    extensions: Readonly<GraphQLFieldExtensions<TSource, TContext, TArgs>>;
    astNode: Maybe<FieldDefinitionNode>;
    constructor(parentType: GraphQLObjectType<TSource, TContext> | GraphQLInterfaceType<TSource, TContext> | undefined, name: string, config: GraphQLFieldConfig<TSource, TContext, TArgs>);
    get [Symbol.toStringTag](): string;
    toConfig(): GraphQLFieldNormalizedConfig<TSource, TContext, TArgs>;
    toString(): string;
    toJSON(): string;
}
export declare class GraphQLArgument implements GraphQLSchemaElement {
    parent: GraphQLField | GraphQLDirective;
    name: string;
    description: Maybe<string>;
    type: GraphQLInputType;
    defaultValue: unknown;
    default: GraphQLDefaultInput | undefined;
    deprecationReason: Maybe<string>;
    extensions: Readonly<GraphQLArgumentExtensions>;
    astNode: Maybe<InputValueDefinitionNode>;
    constructor(parent: GraphQLField | GraphQLDirective, name: string, config: GraphQLArgumentConfig);
    get [Symbol.toStringTag](): string;
    toConfig(): GraphQLArgumentNormalizedConfig;
    toString(): string;
    toJSON(): string;
}
export declare function isRequiredArgument(arg: GraphQLArgument | GraphQLVariableSignature): boolean;
export type GraphQLFieldMap<TSource, TContext> = ObjMap<GraphQLField<TSource, TContext>>;
export type GraphQLDefaultInput = {
    value: unknown;
    literal?: never;
} | {
    literal: ConstValueNode;
    value?: never;
};
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */
export interface GraphQLInterfaceTypeExtensions {
    [attributeName: string | symbol]: unknown;
}
/**
 * Interface Type Definition
 *
 * When a field can return one of a heterogeneous set of types, a Interface type
 * is used to describe what types are possible, what fields are in common across
 * all types, as well as a function to determine which type is actually used
 * when the field is resolved.
 *
 * Example:
 *
 * ```ts
 * const EntityType = new GraphQLInterfaceType({
 *   name: 'Entity',
 *   fields: {
 *     name: { type: GraphQLString }
 *   }
 * });
 * ```
 */
export declare class GraphQLInterfaceType<TSource = any, TContext = any> implements GraphQLSchemaElement {
    name: string;
    description: Maybe<string>;
    resolveType: Maybe<GraphQLTypeResolver<TSource, TContext>>;
    extensions: Readonly<GraphQLInterfaceTypeExtensions>;
    astNode: Maybe<InterfaceTypeDefinitionNode>;
    extensionASTNodes: ReadonlyArray<InterfaceTypeExtensionNode>;
    private _fields;
    private _interfaces;
    constructor(config: Readonly<GraphQLInterfaceTypeConfig<TSource, TContext>>);
    get [Symbol.toStringTag](): string;
    getFields(): GraphQLFieldMap<TSource, TContext>;
    getInterfaces(): ReadonlyArray<GraphQLInterfaceType>;
    toConfig(): GraphQLInterfaceTypeNormalizedConfig<TSource, TContext>;
    toString(): string;
    toJSON(): string;
}
export interface GraphQLInterfaceTypeConfig<TSource, TContext> {
    name: string;
    description?: Maybe<string>;
    interfaces?: ThunkReadonlyArray<GraphQLInterfaceType> | undefined;
    fields: ThunkObjMap<GraphQLFieldConfig<TSource, TContext>>;
    /**
     * Optionally provide a custom type resolver function. If one is not provided,
     * the default implementation will call `isTypeOf` on each implementing
     * Object type.
     */
    resolveType?: Maybe<GraphQLTypeResolver<TSource, TContext>>;
    extensions?: Maybe<Readonly<GraphQLInterfaceTypeExtensions>>;
    astNode?: Maybe<InterfaceTypeDefinitionNode>;
    extensionASTNodes?: Maybe<ReadonlyArray<InterfaceTypeExtensionNode>>;
}
export interface GraphQLInterfaceTypeNormalizedConfig<TSource, TContext> extends GraphQLInterfaceTypeConfig<any, any> {
    interfaces: ReadonlyArray<GraphQLInterfaceType>;
    fields: GraphQLFieldNormalizedConfigMap<TSource, TContext>;
    extensions: Readonly<GraphQLInterfaceTypeExtensions>;
    extensionASTNodes: ReadonlyArray<InterfaceTypeExtensionNode>;
}
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */
export interface GraphQLUnionTypeExtensions {
    [attributeName: string | symbol]: unknown;
}
/**
 * Union Type Definition
 *
 * When a field can return one of a heterogeneous set of types, a Union type
 * is used to describe what types are possible as well as providing a function
 * to determine which type is actually used when the field is resolved.
 *
 * Example:
 *
 * ```ts
 * const PetType = new GraphQLUnionType({
 *   name: 'Pet',
 *   types: [ DogType, CatType ],
 *   resolveType(value) {
 *     if (value instanceof Dog) {
 *       return DogType;
 *     }
 *     if (value instanceof Cat) {
 *       return CatType;
 *     }
 *   }
 * });
 * ```
 */
export declare class GraphQLUnionType implements GraphQLSchemaElement {
    name: string;
    description: Maybe<string>;
    resolveType: Maybe<GraphQLTypeResolver<any, any>>;
    extensions: Readonly<GraphQLUnionTypeExtensions>;
    astNode: Maybe<UnionTypeDefinitionNode>;
    extensionASTNodes: ReadonlyArray<UnionTypeExtensionNode>;
    private _types;
    constructor(config: Readonly<GraphQLUnionTypeConfig<any, any>>);
    get [Symbol.toStringTag](): string;
    getTypes(): ReadonlyArray<GraphQLObjectType>;
    toConfig(): GraphQLUnionTypeNormalizedConfig;
    toString(): string;
    toJSON(): string;
}
export interface GraphQLUnionTypeConfig<TSource, TContext> {
    name: string;
    description?: Maybe<string>;
    types: ThunkReadonlyArray<GraphQLObjectType>;
    /**
     * Optionally provide a custom type resolver function. If one is not provided,
     * the default implementation will call `isTypeOf` on each implementing
     * Object type.
     */
    resolveType?: Maybe<GraphQLTypeResolver<TSource, TContext>>;
    extensions?: Maybe<Readonly<GraphQLUnionTypeExtensions>>;
    astNode?: Maybe<UnionTypeDefinitionNode>;
    extensionASTNodes?: Maybe<ReadonlyArray<UnionTypeExtensionNode>>;
}
export interface GraphQLUnionTypeNormalizedConfig extends GraphQLUnionTypeConfig<any, any> {
    types: ReadonlyArray<GraphQLObjectType>;
    extensions: Readonly<GraphQLUnionTypeExtensions>;
    extensionASTNodes: ReadonlyArray<UnionTypeExtensionNode>;
}
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */
export interface GraphQLEnumTypeExtensions {
    [attributeName: string | symbol]: unknown;
}
/**
 * Enum Type Definition
 *
 * Some leaf values of requests and input values are Enums. GraphQL coerces
 * Enum values as strings, however internally Enums can be represented by any
 * kind of type, often integers.
 *
 * Example:
 *
 * ```ts
 * const RGBType = new GraphQLEnumType({
 *   name: 'RGB',
 *   values: {
 *     RED: { value: 0 },
 *     GREEN: { value: 1 },
 *     BLUE: { value: 2 }
 *   }
 * });
 * ```
 *
 * Note: If a value is not provided in a definition, the name of the enum value
 * will be used as its internal value.
 */
export declare class GraphQLEnumType/* <T> */  implements GraphQLSchemaElement {
    name: string;
    description: Maybe<string>;
    extensions: Readonly<GraphQLEnumTypeExtensions>;
    astNode: Maybe<EnumTypeDefinitionNode>;
    extensionASTNodes: ReadonlyArray<EnumTypeExtensionNode>;
    private _values;
    private _valueLookup;
    private _nameLookup;
    constructor(config: Readonly<GraphQLEnumTypeConfig>);
    get [Symbol.toStringTag](): string;
    getValues(): ReadonlyArray<GraphQLEnumValue>;
    getValue(name: string): Maybe<GraphQLEnumValue>;
    /** @deprecated use `coerceOutputValue()` instead, `serialize()` will be removed in v18 */
    serialize(outputValue: unknown): Maybe<string>;
    coerceOutputValue(outputValue: unknown): Maybe<string>;
    /** @deprecated use `coerceInputValue()` instead, `parseValue()` will be removed in v18 */
    parseValue(inputValue: unknown, hideSuggestions?: Maybe<boolean>): Maybe<any>;
    coerceInputValue(inputValue: unknown, hideSuggestions?: Maybe<boolean>): Maybe<any>;
    /** @deprecated use `coerceInputLiteral()` instead, `parseLiteral()` will be removed in v18 */
    parseLiteral(valueNode: ValueNode, _variables: Maybe<ObjMap<unknown>>, hideSuggestions?: Maybe<boolean>): Maybe<any>;
    coerceInputLiteral(valueNode: ConstValueNode, hideSuggestions?: Maybe<boolean>): Maybe<any>;
    valueToLiteral(value: unknown): ConstValueNode | undefined;
    toConfig(): GraphQLEnumTypeNormalizedConfig;
    toString(): string;
    toJSON(): string;
}
export interface GraphQLEnumTypeConfig {
    name: string;
    description?: Maybe<string>;
    values: ThunkObjMap<GraphQLEnumValueConfig>;
    extensions?: Maybe<Readonly<GraphQLEnumTypeExtensions>>;
    astNode?: Maybe<EnumTypeDefinitionNode>;
    extensionASTNodes?: Maybe<ReadonlyArray<EnumTypeExtensionNode>>;
}
export interface GraphQLEnumTypeNormalizedConfig extends GraphQLEnumTypeConfig {
    values: GraphQLEnumValueNormalizedConfigMap;
    extensions: Readonly<GraphQLEnumTypeExtensions>;
    extensionASTNodes: ReadonlyArray<EnumTypeExtensionNode>;
}
export type GraphQLEnumValueConfigMap = ObjMap<GraphQLEnumValueConfig>;
export type GraphQLEnumValueNormalizedConfigMap = ObjMap<GraphQLEnumValueNormalizedConfig>;
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */
export interface GraphQLEnumValueExtensions {
    [attributeName: string | symbol]: unknown;
}
export interface GraphQLEnumValueConfig {
    description?: Maybe<string>;
    value?: any;
    deprecationReason?: Maybe<string>;
    extensions?: Maybe<Readonly<GraphQLEnumValueExtensions>>;
    astNode?: Maybe<EnumValueDefinitionNode>;
}
export interface GraphQLEnumValueNormalizedConfig extends GraphQLEnumValueConfig {
    extensions: Readonly<GraphQLEnumValueExtensions>;
}
export declare class GraphQLEnumValue implements GraphQLSchemaElement {
    parentEnum: GraphQLEnumType;
    name: string;
    description: Maybe<string>;
    value: any;
    deprecationReason: Maybe<string>;
    extensions: Readonly<GraphQLEnumValueExtensions>;
    astNode: Maybe<EnumValueDefinitionNode>;
    constructor(parentEnum: GraphQLEnumType, name: string, config: GraphQLEnumValueConfig);
    get [Symbol.toStringTag](): string;
    toConfig(): GraphQLEnumValueNormalizedConfig;
    toString(): string;
    toJSON(): string;
}
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */
export interface GraphQLInputObjectTypeExtensions {
    [attributeName: string | symbol]: unknown;
}
/**
 * Input Object Type Definition
 *
 * An input object defines a structured collection of fields which may be
 * supplied to a field argument.
 *
 * Using `NonNull` will ensure that a value must be provided by the query
 *
 * Example:
 *
 * ```ts
 * const GeoPoint = new GraphQLInputObjectType({
 *   name: 'GeoPoint',
 *   fields: {
 *     lat: { type: new GraphQLNonNull(GraphQLFloat) },
 *     lon: { type: new GraphQLNonNull(GraphQLFloat) },
 *     alt: { type: GraphQLFloat, defaultValue: 0 },
 *   }
 * });
 * ```
 */
export declare class GraphQLInputObjectType implements GraphQLSchemaElement {
    name: string;
    description: Maybe<string>;
    extensions: Readonly<GraphQLInputObjectTypeExtensions>;
    astNode: Maybe<InputObjectTypeDefinitionNode>;
    extensionASTNodes: ReadonlyArray<InputObjectTypeExtensionNode>;
    isOneOf: boolean;
    private _fields;
    constructor(config: Readonly<GraphQLInputObjectTypeConfig>);
    get [Symbol.toStringTag](): string;
    getFields(): GraphQLInputFieldMap;
    toConfig(): GraphQLInputObjectTypeNormalizedConfig;
    toString(): string;
    toJSON(): string;
}
export interface GraphQLInputObjectTypeConfig {
    name: string;
    description?: Maybe<string>;
    fields: ThunkObjMap<GraphQLInputFieldConfig>;
    extensions?: Maybe<Readonly<GraphQLInputObjectTypeExtensions>>;
    astNode?: Maybe<InputObjectTypeDefinitionNode>;
    extensionASTNodes?: Maybe<ReadonlyArray<InputObjectTypeExtensionNode>>;
    isOneOf?: boolean;
}
export interface GraphQLInputObjectTypeNormalizedConfig extends GraphQLInputObjectTypeConfig {
    fields: GraphQLInputFieldNormalizedConfigMap;
    extensions: Readonly<GraphQLInputObjectTypeExtensions>;
    extensionASTNodes: ReadonlyArray<InputObjectTypeExtensionNode>;
}
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */
export interface GraphQLInputFieldExtensions {
    [attributeName: string | symbol]: unknown;
}
export interface GraphQLInputFieldConfig {
    description?: Maybe<string>;
    type: GraphQLInputType;
    /** @deprecated use default instead, defaultValue will be removed in v18 **/
    defaultValue?: unknown;
    default?: GraphQLDefaultInput | undefined;
    deprecationReason?: Maybe<string>;
    extensions?: Maybe<Readonly<GraphQLInputFieldExtensions>>;
    astNode?: Maybe<InputValueDefinitionNode>;
}
export type GraphQLInputFieldConfigMap = ObjMap<GraphQLInputFieldConfig>;
export interface GraphQLInputFieldNormalizedConfig extends GraphQLInputFieldConfig {
    default: GraphQLDefaultInput | undefined;
    extensions: Readonly<GraphQLInputFieldExtensions>;
}
export type GraphQLInputFieldNormalizedConfigMap = ObjMap<GraphQLInputFieldNormalizedConfig>;
export declare class GraphQLInputField implements GraphQLSchemaElement {
    parentType: GraphQLInputObjectType;
    name: string;
    description: Maybe<string>;
    type: GraphQLInputType;
    defaultValue: unknown;
    default: GraphQLDefaultInput | undefined;
    deprecationReason: Maybe<string>;
    extensions: Readonly<GraphQLInputFieldExtensions>;
    astNode: Maybe<InputValueDefinitionNode>;
    constructor(parentType: GraphQLInputObjectType, name: string, config: GraphQLInputFieldConfig);
    get [Symbol.toStringTag](): string;
    toConfig(): GraphQLInputFieldNormalizedConfig;
    toString(): string;
    toJSON(): string;
}
export declare function isRequiredInputField(field: GraphQLInputField): boolean;
export type GraphQLInputFieldMap = ObjMap<GraphQLInputField>;
