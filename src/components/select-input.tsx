import {
  type SelectContentProps as _SelectContentProps,
  type SelectItemProps as _SelectItemProps,
  Select as _Select,
} from '@kobalte/core/select';
import {
  type ComponentProps,
  type JSXElement,
  createMemo,
  splitProps,
} from 'solid-js';

import { type WithOverride } from '~/utils';
import {
  type FormInputProps,
  FORM_INPUT_PROP_NAMES,
  makeFieldComponent,
} from './forms';

export type SelectFieldProps = ComponentProps<typeof SelectField>;

export const SelectField = makeFieldComponent({
  inputComponent: SelectInput,
  inputPropNames: [
    ...FORM_INPUT_PROP_NAMES,
    'placeholder',
    'options',
    'required',
  ],
});

export interface SelectOption<T> {
  /**
   * The value of the option.
   */
  value: T;

  /**
   * Must be a string if `textLabel` is not provided.
   */
  label: string | JSXElement;

  /**
   * Optional text label for the option.
   */
  textLabel?: string;
}

interface SelectInputOptions<T>
  extends FormInputProps<HTMLSelectElement, T | null> {
  placeholder?: string;
  options: SelectOption<T>[];
  required?: boolean;
  disabled?: boolean;
}

export type SelectInputProps<T> = WithOverride<
  ComponentProps<'div'>,
  SelectInputOptions<T>
>;

export function SelectInput<T>(props: SelectInputProps<T>) {
  const [_, rest] = splitProps(props, [
    ...FORM_INPUT_PROP_NAMES,
    'placeholder',
    'options',
    'required',
  ]);

  const optionValue = createMemo(() =>
    props.options.find(option => props.value === option.value),
  );

  return (
    <_Select
      {...rest}
      disabled={props.disabled}
      options={props.options}
      optionValue="value"
      optionTextValue={option =>
        option.textLabel ?? (option.label as string)
      }
      onChange={option => props.onChange?.(option ? option.value : null)}
      value={optionValue()}
      itemComponent={props => (
        <_Select.Item
          item={props.item}
          class={
            'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
          }
        >
          <_Select.ItemIndicator class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m5 12l5 5L20 7"
              />
              <title>Checked</title>
            </svg>
          </_Select.ItemIndicator>
          <_Select.ItemLabel>{props.item.textValue}</_Select.ItemLabel>
        </_Select.Item>
      )}
    >
      <_Select.HiddenSelect onBlur={props.onBlur} />

      {/* Trigger for opening select dropdown. */}
      <_Select.Trigger
        class={
          'flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background transition-shadow placeholder:text-muted-foreground focus:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        }
      >
        <_Select.Value<SelectOption<T>>>
          {state => state.selectedOption().label}
        </_Select.Value>

        <_Select.Icon
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          class="flex size-4 items-center justify-center opacity-50"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m8 9l4-4l4 4m0 6l-4 4l-4-4"
          />
        </_Select.Icon>
      </_Select.Trigger>

      <_Select.Portal>
        <_Select.Content
          class={
            'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95'
          }
        >
          {/* Item components are rendered within the listbox. */}
          <_Select.Listbox class="p-1 focus-visible:outline-none" />
        </_Select.Content>
      </_Select.Portal>
    </_Select>
  );
}
