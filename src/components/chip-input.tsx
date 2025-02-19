import {
  type ComponentProps,
  createSignal,
  Show,
  splitProps,
} from 'solid-js';
import { IconX } from '@tabler/icons-solidjs';

import type { WithOverride } from '~/utils';
import {
  FORM_INPUT_PROP_NAMES,
  makeFieldComponent,
  type FormInputProps,
} from './forms';
import { TextInput } from './text-input';
import { Badge } from './badge';

export type ChipFieldProps = ComponentProps<typeof ChipField>;

export const ChipField = makeFieldComponent({
  inputComponent: ChipInput,
  inputPropNames: [...FORM_INPUT_PROP_NAMES, 'placeholder'],
});

export interface ChipInputOptions
  extends FormInputProps<HTMLInputElement, string[]> {
  placeholder?: string;
  disabled?: boolean;
}

export type ChipInputProps = WithOverride<
  ComponentProps<'div'>,
  ChipInputOptions
>;

export function ChipInput(props: ChipInputProps) {
  const [_, rest] = splitProps(props, [
    ...FORM_INPUT_PROP_NAMES,
    'placeholder',
    'disabled',
  ]);

  const [inputValue, setInputValue] = createSignal('');

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && inputValue() !== '') {
      event.preventDefault();
      addChip(inputValue());
      setInputValue('');
    }
  }

  function addChip(chip: string) {
    props.onChange?.([...(props.value ?? []), chip]);
  }

  function removeChip(chip: string) {
    props.onChange?.(props.value?.filter(t => t !== chip) ?? []);
  }

  return (
    <div {...rest}>
      <TextInput
        disabled={props.disabled}
        onBlur={() => props.onBlur?.()}
        onKeyDown={onKeyDown}
        onChange={setInputValue}
        placeholder={props.placeholder}
        value={inputValue()}
      />

      <Show when={props.value?.length}>
        <div class="flex flex-wrap gap-2 mt-2">
          {props.value?.map(chip => (
            <Badge variant="secondary">
              {chip}
              {!props.disabled && (
                <IconX
                  onClick={() => removeChip(chip)}
                  class="ml-1 h-3 w-3 cursor-pointer"
                />
              )}
            </Badge>
          ))}
        </div>
      </Show>
    </div>
  );
}
