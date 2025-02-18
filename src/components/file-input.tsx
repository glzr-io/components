import { type ComponentProps, splitProps } from 'solid-js';

import { cn, type WithOverride } from '~/utils';
import {
  makeFieldComponent,
  FORM_INPUT_PROP_NAMES,
  type FormInputProps,
} from './forms';

export type FileFieldProps = ComponentProps<typeof FileField>;

export const FileField = makeFieldComponent({
  inputComponent: FileInput,
  inputPropNames: [...FORM_INPUT_PROP_NAMES, 'multiple', 'accept'],
});

export interface FileInputOptions
  extends FormInputProps<HTMLInputElement, File[] | null> {
  multiple?: boolean;
  accept?: string;
}

export type FileInputProps = WithOverride<
  ComponentProps<'input'>,
  FileInputOptions
>;

/**
 * A file input component that allows users to select one or multiple
 * files.
 */
export function FileInput(props: FileInputProps) {
  // `value` cannot be set for file inputs and thus gets discarded.
  const [_, rest] = splitProps(props, ['class', 'onChange', 'value']);

  function onChange(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : null;
    props.onChange?.(files);
  }

  return (
    <input
      type="file"
      class={cn(
        'flex w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-shadow file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-secondary file:text-sm file:font-medium hover:file:bg-secondary/80 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )}
      onChange={onChange}
      {...rest}
    />
  );
}
