import type { VariantProps } from 'class-variance-authority';
import { For, splitProps, type ComponentProps } from 'solid-js';

import { cn } from '~/utils';
import { Button, buttonVariants } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

type DropdownButtonProps = ComponentProps<'div'> &
  VariantProps<typeof buttonVariants> & {
    options: string[];
    selectedOption: string | null;
    placeholder?: string;
    onClick?: () => void;
    onSelect?: (option: string) => void;
  };

export function DropdownButton(props: DropdownButtonProps) {
  const [_, rest] = splitProps(props, [
    'class',
    'variant',
    'size',
    'options',
    'selectedOption',
    'placeholder',
    'onClick',
    'onSelect',
  ]);

  return (
    <div class={cn('flex items-center', props.class)} {...rest}>
      <Button
        variant={props.variant ?? 'outline'}
        class="rounded-r-none"
        onClick={() => props.onClick?.()}
      >
        {props.selectedOption ?? props.placeholder ?? 'Select'}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant={props.variant ?? 'outline'}
            class="rounded-l-none border-l-0 px-2"
          >
            v
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <For each={props.options}>
            {option => (
              <DropdownMenuItem
                onClick={() => props.onSelect?.(option)}
                class={cn({
                  'bg-accent text-accent-foreground':
                    option === props.selectedOption,
                })}
              >
                {option}
              </DropdownMenuItem>
            )}
          </For>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
