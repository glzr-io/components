import type { PolymorphicProps } from '@kobalte/core/polymorphic';
import {
  type ToggleButtonRootProps as _ToggleButtonRootProps,
  ToggleButton as _ToggleButton,
} from '@kobalte/core/toggle-button';
import { type VariantProps, cva } from 'class-variance-authority';
import { splitProps, type ValidComponent } from 'solid-js';

import { cn } from '~/utils';

export const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-[box-shadow,color,background-color] hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-accent data-[pressed]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-3',
        sm: 'h-8 px-2',
        lg: 'h-10 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ToggleButtonProps<T extends ValidComponent = 'button'> =
  _ToggleButtonRootProps<T> &
    VariantProps<typeof toggleVariants> & {
      class?: string;
    };

export function ToggleButton<T extends ValidComponent = 'button'>(
  props: PolymorphicProps<T, ToggleButtonProps<T>>,
) {
  const [local, rest] = splitProps(props as ToggleButtonProps, [
    'class',
    'variant',
    'size',
  ]);

  return (
    <_ToggleButton
      class={cn(
        toggleVariants({ variant: local.variant, size: local.size }),
        local.class,
      )}
      {...rest}
    />
  );
}
