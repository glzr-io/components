import { Checkbox as _Checkbox } from '@kobalte/core/checkbox';
import { type ComponentProps, splitProps } from 'solid-js';

import type { WithOverride } from '~/utils';
import {
  FORM_INPUT_PROP_NAMES,
  makeFieldComponent,
  type FormInputProps,
} from './forms';

export type CheckboxFieldProps = ComponentProps<typeof CheckboxField>;

export const CheckboxField = makeFieldComponent({
  inputComponent: CheckboxInput,
  inputPropNames: FORM_INPUT_PROP_NAMES,
});

export interface CheckboxInputOptions
  extends FormInputProps<HTMLInputElement, boolean> {
  disabled?: boolean;
}

export type CheckboxInputProps = WithOverride<
  ComponentProps<'div'>,
  CheckboxInputOptions
>;

export function CheckboxInput(props: CheckboxInputProps) {
  const [_, rest] = splitProps(props, FORM_INPUT_PROP_NAMES);

  return (
    <_Checkbox
      checked={props.value}
      onChange={value => props.onChange?.(value)}
      disabled={props.disabled}
      {...rest}
    >
      <_Checkbox.Input
        onBlur={() => props.onBlur?.()}
        class="[&:focus-visible+div]:outline-none [&:focus-visible+div]:ring-[1.5px] [&:focus-visible+div]:ring-ring [&:focus-visible+div]:ring-offset-2 [&:focus-visible+div]:ring-offset-background"
      />

      <_Checkbox.Control
        class={
          'h-4 w-4 shrink-0 rounded-sm border border-primary shadow transition-shadow focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[disabled]:cursor-not-allowed data-[checked]:bg-primary data-[checked]:text-primary-foreground data-[disabled]:opacity-50'
        }
      >
        <_Checkbox.Indicator class="flex items-center justify-center text-current">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-4 w-4"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m5 12l5 5L20 7"
            />
            <title>Checkbox</title>
          </svg>
        </_Checkbox.Indicator>
      </_Checkbox.Control>
    </_Checkbox>
  );
}
