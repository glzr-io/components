import {
  type NumberFieldInputProps as _NumberFieldInputProps,
  type NumberFieldRootProps as _NumberFieldRootProps,
  NumberField as _NumberField,
} from '@kobalte/core/number-field';
import type { PolymorphicProps as _PolymorphicProps } from '@kobalte/core/polymorphic';
import { type ComponentProps, splitProps } from 'solid-js';

import { cn, type WithOverride } from '~/utils';
import {
  FORM_INPUT_PROP_NAMES,
  makeFieldComponent,
  type FormInputProps,
} from './forms';

export type NumberFieldProps = ComponentProps<typeof NumberField>;

export const NumberField = makeFieldComponent({
  inputComponent: NumberInput,
  inputPropNames: [...FORM_INPUT_PROP_NAMES, 'placeholder'],
});

interface NumberInputOptions
  extends FormInputProps<HTMLInputElement, number> {
  placeholder?: string;
}

export type NumberInputProps = WithOverride<
  ComponentProps<'div'>,
  NumberInputOptions
>;

export function NumberInput(props: NumberInputProps) {
  const [local, rest] = splitProps(props, [
    'class',
    ...FORM_INPUT_PROP_NAMES,
  ]);

  return (
    <_NumberField
      rawValue={local.value}
      onRawValueChange={local.onChange}
      class={cn(
        'relative rounded-md transition-shadow focus-within:outline-none focus-within:ring-[1.5px] focus-within:ring-ring',
        local.class,
      )}
    >
      <_NumberField.Input
        class={
          'flex h-9 w-full rounded-md border border-input bg-transparent px-10 py-1 text-center text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        }
        onBlur={() => props.onBlur?.()}
        {...rest}
      />

      <_NumberField.DecrementTrigger
        class={
          'absolute left-0 top-1/2 -translate-y-1/2 p-3 disabled:cursor-not-allowed disabled:opacity-20'
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14"
          />
          <title>Decreasing number</title>
        </svg>
      </_NumberField.DecrementTrigger>

      <_NumberField.IncrementTrigger
        class={
          'absolute right-0 top-1/2 -translate-y-1/2 p-3 disabled:cursor-not-allowed disabled:opacity-20'
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v14m-7-7h14"
          />
          <title>Increase number</title>
        </svg>
      </_NumberField.IncrementTrigger>
    </_NumberField>
  );
}
