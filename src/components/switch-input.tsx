import { Switch as _Switch } from '@kobalte/core/switch';
import { type ComponentProps, splitProps } from 'solid-js';

import type { WithOverride } from '~/utils';
import {
  makeFieldComponent,
  FORM_INPUT_PROP_NAMES,
  type FormInputProps,
} from './forms';

export type SwitchFieldProps = ComponentProps<typeof SwitchField>;

export const SwitchField = makeFieldComponent({
  inputComponent: SwitchInput,
  inputPropNames: FORM_INPUT_PROP_NAMES,
});

export interface SwitchInputOptions
  extends FormInputProps<HTMLInputElement, boolean> {}

export type SwitchInputProps = WithOverride<
  ComponentProps<'div'>,
  SwitchInputOptions
>;

export function SwitchInput(props: SwitchInputProps) {
  const [local, rest] = splitProps(props, FORM_INPUT_PROP_NAMES);

  return (
    <_Switch
      checked={local.value}
      onChange={val => local.onChange?.(val)}
      {...rest}
    >
      <_Switch.Input
        onBlur={() => local.onBlur?.()}
        class="[&:focus-visible+div]:outline-none [&:focus-visible+div]:ring-[1.5px] [&:focus-visible+div]:ring-ring [&:focus-visible+div]:ring-offset-2 [&:focus-visible+div]:ring-offset-background"
      />
      <_Switch.Control
        class={
          'inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input shadow-sm transition-[color,background-color,box-shadow] data-[disabled]:cursor-not-allowed data-[checked]:bg-primary data-[disabled]:opacity-50'
        }
      >
        <_Switch.Thumb
          class={
            'pointer-events-none block h-4 w-4 translate-x-0 rounded-full bg-background shadow-lg ring-0 transition-transform data-[checked]:translate-x-4'
          }
        />
      </_Switch.Control>
    </_Switch>
  );
}
