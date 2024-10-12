import { type ComponentProps, splitProps } from 'solid-js';

import { cn, type WithOverride } from '~/utils';
import {
  makeFieldComponent,
  FORM_INPUT_PROP_NAMES,
  type FormInputProps,
} from './forms';

export type TextFieldProps = ComponentProps<typeof TextField>;

export const TextField = makeFieldComponent({
  inputComponent: TextInput,
  inputPropNames: [
    ...FORM_INPUT_PROP_NAMES,
    'type',
    'placeholder',
    'required',
  ],
});

export interface TextInputOptions
  extends FormInputProps<HTMLInputElement, string> {}

export type TextInputProps = WithOverride<
  ComponentProps<'input'>,
  TextInputOptions
>;

export function TextInput(props: TextInputProps) {
  const [_, rest] = splitProps(props, ['class', 'onChange']);

  return (
    <input
      class={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-shadow file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )}
      onChange={e => props.onChange?.(e.target.value)}
      autocomplete="off"
      aria-autocomplete="none"
      {...rest}
    />
  );
}
