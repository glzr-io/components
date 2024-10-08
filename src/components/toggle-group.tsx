import type { PolymorphicProps } from '@kobalte/core/polymorphic';
import {
  type ToggleGroupItemProps as _ToggleGroupItemProps,
  type ToggleGroupRootProps as _ToggleGroupRootProps,
  ToggleGroup as _ToggleGroup,
} from '@kobalte/core/toggle-group';
import type { VariantProps } from 'class-variance-authority';
import type { Accessor, ParentProps, ValidComponent } from 'solid-js';
import {
  createContext,
  createMemo,
  splitProps,
  useContext,
} from 'solid-js';

import { toggleVariants } from './toggle';
import { cn } from '~/utils';

const ToggleGroupContext =
  createContext<Accessor<VariantProps<typeof toggleVariants>>>();

const useToggleGroup = () => {
  const context = useContext(ToggleGroupContext);

  if (!context) {
    throw new Error(
      '`useToggleGroup`: must be used within a `ToggleGroup` component',
    );
  }

  return context;
};

type ToggleGroupProps<T extends ValidComponent = 'div'> = ParentProps<
  _ToggleGroupRootProps<T> &
    VariantProps<typeof toggleVariants> & {
      class?: string;
    }
>;

export const ToggleGroup = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, ToggleGroupProps<T>>,
) => {
  const [local, rest] = splitProps(props as ToggleGroupProps, [
    'class',
    'children',
    'size',
    'variant',
  ]);

  const value = createMemo<VariantProps<typeof toggleVariants>>(() => ({
    size: local.size,
    variant: local.variant,
  }));

  return (
    <_ToggleGroup
      class={cn('flex items-center justify-center gap-1', local.class)}
      {...rest}
    >
      <ToggleGroupContext.Provider value={value}>
        {local.children}
      </ToggleGroupContext.Provider>
    </_ToggleGroup>
  );
};

type toggleGroupItemProps<T extends ValidComponent = 'button'> =
  _ToggleGroupItemProps<T> & {
    class?: string;
  };

export const ToggleGroupItem = <T extends ValidComponent = 'button'>(
  props: PolymorphicProps<T, toggleGroupItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as toggleGroupItemProps, [
    'class',
  ]);
  const context = useToggleGroup();

  return (
    <_ToggleGroup.Item
      class={cn(
        toggleVariants({
          variant: context().variant,
          size: context().size,
        }),
        local.class,
      )}
      {...rest}
    />
  );
};
