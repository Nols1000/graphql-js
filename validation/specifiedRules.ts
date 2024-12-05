// Spec Section: "Defer And Stream Directive Labels Are Unique"
import { DeferStreamDirectiveLabelRule } from './rules/DeferStreamDirectiveLabelRule.ts';
// Spec Section: "Defer And Stream Directives Are Used On Valid Root Field"
import { DeferStreamDirectiveOnRootFieldRule } from './rules/DeferStreamDirectiveOnRootFieldRule.ts';
// Spec Section: "Defer And Stream Directives Are Used On Valid Operations"
import { DeferStreamDirectiveOnValidOperationsRule } from './rules/DeferStreamDirectiveOnValidOperationsRule.ts';
// Spec Section: "Executable Definitions"
import { ExecutableDefinitionsRule } from './rules/ExecutableDefinitionsRule.ts';
// Spec Section: "Field Selections on Objects, Interfaces, and Unions Types"
import { FieldsOnCorrectTypeRule } from './rules/FieldsOnCorrectTypeRule.ts';
// Spec Section: "Fragments on Composite Types"
import { FragmentsOnCompositeTypesRule } from './rules/FragmentsOnCompositeTypesRule.ts';
// Spec Section: "Argument Names"
import {
  KnownArgumentNamesOnDirectivesRule,
  KnownArgumentNamesRule,
} from './rules/KnownArgumentNamesRule.ts';
// Spec Section: "Directives Are Defined"
import { KnownDirectivesRule } from './rules/KnownDirectivesRule.ts';
// Spec Section: "Fragment spread target defined"
import { KnownFragmentNamesRule } from './rules/KnownFragmentNamesRule.ts';
// Spec Section: "Operation Type Existence"
import { KnownOperationTypesRule } from './rules/KnownOperationTypesRule.ts';
// Spec Section: "Fragment Spread Type Existence"
import { KnownTypeNamesRule } from './rules/KnownTypeNamesRule.ts';
// Spec Section: "Lone Anonymous Operation"
import { LoneAnonymousOperationRule } from './rules/LoneAnonymousOperationRule.ts';
// SDL-specific validation rules
import { LoneSchemaDefinitionRule } from './rules/LoneSchemaDefinitionRule.ts';
// TODO: Spec Section
import { MaxIntrospectionDepthRule } from './rules/MaxIntrospectionDepthRule.ts';
// Spec Section: "Fragments must not form cycles"
import { NoFragmentCyclesRule } from './rules/NoFragmentCyclesRule.ts';
// Spec Section: "All Variable Used Defined"
import { NoUndefinedVariablesRule } from './rules/NoUndefinedVariablesRule.ts';
// Spec Section: "Fragments must be used"
import { NoUnusedFragmentsRule } from './rules/NoUnusedFragmentsRule.ts';
// Spec Section: "All Variables Used"
import { NoUnusedVariablesRule } from './rules/NoUnusedVariablesRule.ts';
// Spec Section: "Field Selection Merging"
import { OverlappingFieldsCanBeMergedRule } from './rules/OverlappingFieldsCanBeMergedRule.ts';
// Spec Section: "Fragment spread is possible"
import { PossibleFragmentSpreadsRule } from './rules/PossibleFragmentSpreadsRule.ts';
import { PossibleTypeExtensionsRule } from './rules/PossibleTypeExtensionsRule.ts';
// Spec Section: "Argument Optionality"
import {
  ProvidedRequiredArgumentsOnDirectivesRule,
  ProvidedRequiredArgumentsRule,
} from './rules/ProvidedRequiredArgumentsRule.ts';
// Spec Section: "Leaf Field Selections"
import { ScalarLeafsRule } from './rules/ScalarLeafsRule.ts';
// Spec Section: "Subscriptions with Single Root Field"
import { SingleFieldSubscriptionsRule } from './rules/SingleFieldSubscriptionsRule.ts';
// Spec Section: "Stream Directives Are Used On List Fields"
import { StreamDirectiveOnListFieldRule } from './rules/StreamDirectiveOnListFieldRule.ts';
import { UniqueArgumentDefinitionNamesRule } from './rules/UniqueArgumentDefinitionNamesRule.ts';
// Spec Section: "Argument Uniqueness"
import { UniqueArgumentNamesRule } from './rules/UniqueArgumentNamesRule.ts';
import { UniqueDirectiveNamesRule } from './rules/UniqueDirectiveNamesRule.ts';
// Spec Section: "Directives Are Unique Per Location"
import { UniqueDirectivesPerLocationRule } from './rules/UniqueDirectivesPerLocationRule.ts';
import { UniqueEnumValueNamesRule } from './rules/UniqueEnumValueNamesRule.ts';
import { UniqueFieldDefinitionNamesRule } from './rules/UniqueFieldDefinitionNamesRule.ts';
// Spec Section: "Fragment Name Uniqueness"
import { UniqueFragmentNamesRule } from './rules/UniqueFragmentNamesRule.ts';
// Spec Section: "Input Object Field Uniqueness"
import { UniqueInputFieldNamesRule } from './rules/UniqueInputFieldNamesRule.ts';
// Spec Section: "Operation Name Uniqueness"
import { UniqueOperationNamesRule } from './rules/UniqueOperationNamesRule.ts';
import { UniqueOperationTypesRule } from './rules/UniqueOperationTypesRule.ts';
import { UniqueTypeNamesRule } from './rules/UniqueTypeNamesRule.ts';
// Spec Section: "Variable Uniqueness"
import { UniqueVariableNamesRule } from './rules/UniqueVariableNamesRule.ts';
// Spec Section: "Value Type Correctness"
import { ValuesOfCorrectTypeRule } from './rules/ValuesOfCorrectTypeRule.ts';
// Spec Section: "Variables are Input Types"
import { VariablesAreInputTypesRule } from './rules/VariablesAreInputTypesRule.ts';
// Spec Section: "All Variable Usages Are Allowed"
import { VariablesInAllowedPositionRule } from './rules/VariablesInAllowedPositionRule.ts';
import type { SDLValidationRule, ValidationRule } from './ValidationContext.ts';
/**
 * Technically these aren't part of the spec but they are strongly encouraged
 * validation rules.
 */
export const recommendedRules = Object.freeze([MaxIntrospectionDepthRule]);
/**
 * This set includes all validation rules defined by the GraphQL spec.
 *
 * The order of the rules in this list has been adjusted to lead to the
 * most clear output when encountering multiple validation errors.
 */
export const specifiedRules: ReadonlyArray<ValidationRule> = Object.freeze([
  ExecutableDefinitionsRule,
  KnownOperationTypesRule,
  UniqueOperationNamesRule,
  LoneAnonymousOperationRule,
  SingleFieldSubscriptionsRule,
  KnownTypeNamesRule,
  FragmentsOnCompositeTypesRule,
  VariablesAreInputTypesRule,
  ScalarLeafsRule,
  FieldsOnCorrectTypeRule,
  UniqueFragmentNamesRule,
  KnownFragmentNamesRule,
  NoUnusedFragmentsRule,
  PossibleFragmentSpreadsRule,
  NoFragmentCyclesRule,
  UniqueVariableNamesRule,
  NoUndefinedVariablesRule,
  NoUnusedVariablesRule,
  KnownDirectivesRule,
  UniqueDirectivesPerLocationRule,
  DeferStreamDirectiveOnRootFieldRule,
  DeferStreamDirectiveOnValidOperationsRule,
  DeferStreamDirectiveLabelRule,
  StreamDirectiveOnListFieldRule,
  KnownArgumentNamesRule,
  UniqueArgumentNamesRule,
  ValuesOfCorrectTypeRule,
  ProvidedRequiredArgumentsRule,
  VariablesInAllowedPositionRule,
  OverlappingFieldsCanBeMergedRule,
  UniqueInputFieldNamesRule,
  ...recommendedRules,
]);
/**
 * @internal
 */
export const specifiedSDLRules: ReadonlyArray<SDLValidationRule> =
  Object.freeze([
    LoneSchemaDefinitionRule,
    UniqueOperationTypesRule,
    UniqueTypeNamesRule,
    UniqueEnumValueNamesRule,
    UniqueFieldDefinitionNamesRule,
    UniqueArgumentDefinitionNamesRule,
    UniqueDirectiveNamesRule,
    KnownTypeNamesRule,
    KnownDirectivesRule,
    UniqueDirectivesPerLocationRule,
    PossibleTypeExtensionsRule,
    KnownArgumentNamesOnDirectivesRule,
    UniqueArgumentNamesRule,
    UniqueInputFieldNamesRule,
    ProvidedRequiredArgumentsOnDirectivesRule,
  ]);
