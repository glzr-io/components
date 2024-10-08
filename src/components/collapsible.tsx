import {
  type CollapsibleContentProps,
  Collapsible as CollapsiblePrimitive,
} from '@kobalte/core/collapsible';
import type { PolymorphicProps } from '@kobalte/core/polymorphic';
import { splitProps, type ValidComponent } from 'solid-js';

import { cn } from '~/utils';

export const Collapsible = CollapsiblePrimitive;

export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

type collapsibleContentProps<T extends ValidComponent = 'div'> =
  CollapsibleContentProps<T> & {
    class?: string;
  };

export const CollapsibleContent = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, collapsibleContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as collapsibleContentProps, [
    'class',
  ]);

  return (
    <CollapsiblePrimitive.Content
      class={cn(
        'animate-collapsible-up data-[expanded]:animate-collapsible-down',
        local.class,
      )}
      {...rest}
    />
  );
};
