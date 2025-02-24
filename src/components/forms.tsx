import { cva } from 'class-variance-authority';
import {
  Show,
  createMemo,
  type JSXElement,
  splitProps,
  type ComponentProps,
  type ValidComponent,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { cn, type WithOverride } from '~/utils';

export interface FormFieldProps extends ComponentProps<'div'> {
  /**
   * Label text, or JSX to nest inside a <label> element.
   */
  label?: string | JSXElement;

  /**
   * Description text, or JSX to nest inside a <span> element.
   */
  description?: string | JSXElement;

  /**
   * Error message, or JSX to nest inside a <span> element.
   */
  error?: string | JSXElement;

  /**
   * Semantic name for the form field. Used for accessibility.
   */
  name?: string;

  /**
   * Whether the control is disabled.
   */
  disabled?: boolean;

  children: JSXElement;
}

export const FORM_FIELD_PROP_NAMES = [
  'label',
  'description',
  'error',
  'name',
  'disabled',
] as const;

export function FormField(props: FormFieldProps) {
  const [_, others] = splitProps(props, [
    ...FORM_FIELD_PROP_NAMES,
    'children',
  ]);

  const label = createMemo(() => props.label);
  const description = createMemo(() => props.description);
  const error = createMemo(() => props.error);

  return (
    <div {...others} class={cn('mb-3', others.class)} role="group">
      <Show when={label()}>
        <FormLabel for={props.name} disabled={props.disabled}>
          {label()}
        </FormLabel>
      </Show>

      {/* Template for the input element. */}
      {props.children}

      <Show when={error()}>
        <FormError disabled={props.disabled}>{error()}</FormError>
      </Show>

      {/* Show description text when there isn't an error. */}
      <Show when={!error() && description()}>
        <FormDescription disabled={props.disabled}>
          {description()}
        </FormDescription>
      </Show>
    </div>
  );
}

const labelVariants = cva(
  'block text-sm data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70 font-medium mb-1',
  {
    variants: {
      label: {
        true: 'data-[invalid]:text-destructive',
      },
      error: {
        true: 'text-destructive text-xs',
      },
      description: {
        true: 'font-normal text-muted-foreground',
      },
    },
    defaultVariants: {
      label: true,
    },
  },
);

export interface FormLabelProps extends ComponentProps<'label'> {
  for?: string;
  disabled?: boolean;
  children: string | JSXElement;
}

export function FormLabel(props: FormLabelProps) {
  const [_, others] = splitProps(props, ['for', 'children', 'disabled']);

  return (
    <label
      {...others}
      data-disabled={props.disabled || null}
      class={cn(labelVariants(), others.class)}
      for={props.for}
    >
      {props.children}
    </label>
  );
}

export interface FormErrorProps extends ComponentProps<'span'> {
  children: string | JSXElement;
  disabled?: boolean;
}

export function FormError(props: FormErrorProps) {
  const [_, others] = splitProps(props, ['children', 'disabled']);

  return (
    <small
      {...others}
      data-disabled={props.disabled || null}
      class={cn(labelVariants({ error: true }), others.class)}
    >
      {props.children}
    </small>
  );
}

export interface FormDescriptionProps extends ComponentProps<'span'> {
  children: string | JSXElement;
  disabled?: boolean;
}

export function FormDescription(props: FormDescriptionProps) {
  const [_, others] = splitProps(props, ['children', 'disabled']);

  return (
    <small
      {...others}
      data-disabled={props.disabled || null}
      class={cn(
        labelVariants({ description: true, label: false }),
        'mt-1',
        others.class,
      )}
    >
      {props.children}
    </small>
  );
}

export interface MakeFieldComponentOptions<T extends ValidComponent> {
  inputComponent: T;
  inputPropNames: readonly (keyof ComponentProps<T>)[];
}

export type CustomFormFieldProps<T extends ValidComponent> = WithOverride<
  Omit<FormFieldProps, 'children'>,
  ComponentProps<T>
>;

/**
 * Constant array of {@link FormInputProps} prop names.
 */
export const FORM_INPUT_PROP_NAMES = [
  'value',
  'ref',
  'onChange',
  'onBlur',
  'disabled',
] as const;

export interface FormInputProps<T, U> {
  value?: U;
  ref?: (element: T) => void;
  onChange?: (value: U) => void;
  onBlur?: () => void;
}

/**
 * Creates a custom form field component by wrapping an input component
 * with {@link FormField}.
 */
export function makeFieldComponent<T extends ValidComponent>(
  options: MakeFieldComponentOptions<T>,
) {
  return (props: CustomFormFieldProps<T>) => {
    const { inputComponent, inputPropNames } = options;

    const [formFieldProps, inputProps, others] = splitProps(
      props,
      FORM_FIELD_PROP_NAMES,
      inputPropNames,
    );

    return (
      <FormField {...formFieldProps} {...others}>
        <Dynamic component={inputComponent} {...inputProps} />
      </FormField>
    );
  };
}
