import {
  type AccordionContentProps as _AccordionContentProps,
  type AccordionItemProps as _AccordionItemProps,
  type AccordionTriggerProps as _AccordionTriggerProps,
  Accordion as _Accordion,
} from '@kobalte/core/accordion';
import type { PolymorphicProps } from '@kobalte/core/polymorphic';
import {
  type ParentProps,
  type ValidComponent,
  splitProps,
} from 'solid-js';

import { cn } from '~/utils';

export const Accordion = _Accordion;

type AccordionItemProps<T extends ValidComponent = 'div'> =
  _AccordionItemProps<T> & {
    class?: string;
  };

export const AccordionItem = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, AccordionItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as AccordionItemProps, ['class']);

  return <_Accordion.Item class={cn('border-b', local.class)} {...rest} />;
};

type AccordionTriggerProps<T extends ValidComponent = 'button'> =
  ParentProps<
    _AccordionTriggerProps<T> & {
      class?: string;
    }
  >;

export const AccordionTrigger = <T extends ValidComponent = 'button'>(
  props: PolymorphicProps<T, AccordionTriggerProps<T>>,
) => {
  const [local, rest] = splitProps(props as AccordionTriggerProps, [
    'class',
    'children',
  ]);

  return (
    <_Accordion.Header class="flex" as="div">
      <_Accordion.Trigger
        class={cn(
          'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-shadow hover:underline focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring [&[data-expanded]>svg]:rotate-180',
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-4 w-4 text-muted-foreground transition-transform duration-200"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m6 9l6 6l6-6"
          />
          <title>Arrow</title>
        </svg>
      </_Accordion.Trigger>
    </_Accordion.Header>
  );
};

type AccordionContentProps<T extends ValidComponent = 'div'> = ParentProps<
  _AccordionContentProps<T> & {
    class?: string;
  }
>;

export const AccordionContent = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, AccordionContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as AccordionContentProps, [
    'class',
    'children',
  ]);

  return (
    <_Accordion.Content
      class={cn(
        'animate-accordion-up overflow-hidden text-sm data-[expanded]:animate-accordion-down',
        local.class,
      )}
      {...rest}
    >
      <div class="pb-4 pt-0">{local.children}</div>
    </_Accordion.Content>
  );
};
