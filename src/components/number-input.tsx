import {
  type NumberFieldInputProps as _NumberFieldInputProps,
  type NumberFieldRootProps as _NumberFieldRootProps,
  NumberField as _NumberField,
} from '@kobalte/core/number-field';
import { type ComponentProps, splitProps } from 'solid-js';

import { cn, type WithOverride } from '~/utils';
import {
  FORM_INPUT_PROP_NAMES,
  makeFieldComponent,
  type FormInputProps,
} from './forms';
import { IconMinus, IconPlus } from '@tabler/icons-solidjs';

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
    'onBlur',
    'onChange',
    'placeholder',
    ...FORM_INPUT_PROP_NAMES,
  ]);

  return (
    <_NumberField
      rawValue={local.value}
      class={cn(
        'relative rounded-md transition-shadow focus-within:outline-none focus-within:ring-[1.5px] focus-within:ring-ring',
        local.class,
      )}
      {...rest}
    >
      <_NumberField.Input
        placeholder={local.placeholder}
        onChange={e => local.onChange?.(e.currentTarget.valueAsNumber)}
        class={
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-left text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        }
        onBlur={() => local.onBlur?.()}
      />

      <div class="absolute right-0 top-0 flex h-full w-8 flex-col divide-y divide-input border border-input bg-muted rounded-r-md">
        <_NumberField.IncrementTrigger class="flex h-1/2 items-center justify-center hover:bg-muted-foreground/10">
          <IconPlus class="size-3" />
        </_NumberField.IncrementTrigger>
        <_NumberField.DecrementTrigger class="flex h-1/2 items-center justify-center hover:bg-muted-foreground/10">
          <IconMinus class="size-3" />
        </_NumberField.DecrementTrigger>
      </div>
    </_NumberField>
  );
}
