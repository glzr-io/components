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

  const [inputRef, setInputRef] = createSignal<HTMLInputElement>();

  function onKeyDown(event: KeyboardEvent) {
    // Get value directly from input element.
    const inputValue = inputRef()?.value;

    // Add a chip when enter or comma is pressed.
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();

      const trimmed = inputValue?.trim();

      if (trimmed) {
        addChip(trimmed);
        inputRef()!.value = '';
        return;
      }
    }

    // Remove the last chip when backspace is pressed.
    if (event.key === 'Backspace' && !inputValue && props.value?.length) {
      removeChip(props.value[props.value.length - 1]!);
    }
  }

  function addChip(chip: string) {
    // Prevent adding duplicate chips.
    if (!props.value?.includes(chip)) {
      props.onChange?.([...(props.value ?? []), chip]);
    }
  }

  function removeChip(chip: string) {
    props.onChange?.(props.value?.filter(t => t !== chip) ?? []);
  }

  // Handle paste to add multiple chips at once.
  function onPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pasteData = event.clipboardData?.getData('text');
    const pastedChips = (pasteData?.split(/,|\n/) ?? [])
      .map(item => item.trim())
      .filter(Boolean);

    const newChips = [...(props.value ?? [])];
    pastedChips.forEach(chip => {
      if (!newChips.includes(chip)) {
        newChips.push(chip);
      }
    });

    props.onChange?.(newChips);
  }

  return (
    <div {...rest} class="w-full">
      <div
        onClick={() => inputRef()?.focus()}
        class="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 min-h-12"
      >
        <Show when={props.value?.length}>
          {props.value?.map(chip => (
            <Badge
              variant="secondary"
              class="flex items-center gap-1 px-2 py-1"
            >
              {chip}
              {!props.disabled && (
                <IconX
                  onClick={() => removeChip(chip)}
                  class="h-3 w-3 cursor-pointer"
                />
              )}
            </Badge>
          ))}
        </Show>

        <TextInput
          ref={setInputRef}
          disabled={props.disabled}
          onBlur={() => props.onBlur?.()}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          placeholder={props.value?.length ? '' : props.placeholder}
          class="flex-grow !border-0 !ring-0 !shadow-none !p-0 min-w-20"
        />
      </div>
    </div>
  );
}
