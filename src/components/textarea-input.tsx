import {
  type TextFieldTextAreaProps as _TextFieldTextAreaProps,
  TextArea as _TextArea,
  TextField as _TextField,
} from '@kobalte/core/text-field';
import {
  type ComponentProps,
  type ValidComponent,
  type VoidProps,
  splitProps,
} from 'solid-js';

import { cn, type WithOverride } from '~/utils';
import {
  FORM_INPUT_PROP_NAMES,
  makeFieldComponent,
  type FormInputProps,
} from './forms';

export type TextAreaFieldProps = ComponentProps<typeof TextAreaField>;

export const TextAreaField = makeFieldComponent({
  inputComponent: TextAreaInput,
  inputPropNames: FORM_INPUT_PROP_NAMES,
});

export interface TextAreaInputOptions
  extends FormInputProps<HTMLTextAreaElement, string> {}

export type TextAreaInputProps = WithOverride<
  ComponentProps<'div'>,
  TextAreaInputOptions
>;

export function TextAreaInput(props: TextAreaInputProps) {
  const [local, rest] = splitProps(props, FORM_INPUT_PROP_NAMES);

  return (
    <_TextField
      value={local.value}
      onChange={local.onChange}
      onBlur={() => local.onBlur?.()}
      {...rest}
    >
      <_TextArea
        class={
          'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-shadow placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        }
      />
    </_TextField>
  );
}
