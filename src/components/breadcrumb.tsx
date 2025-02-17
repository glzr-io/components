import {
  For,
  Show,
  splitProps,
  type ComponentProps,
  type JSXElement,
  type ParentComponent,
} from 'solid-js';
import { IconChevronRight, IconDots } from '@tabler/icons-solidjs';

import { cn } from '~/utils';

export const Breadcrumb: ParentComponent<
  ComponentProps<'nav'> & {
    separator?: any;
  }
> = props => {
  const [local, rest] = splitProps(props, ['class', 'separator']);

  return <nav aria-label="breadcrumb" class={local.class} {...rest} />;
};

export const BreadcrumbList: ParentComponent<
  ComponentProps<'ol'>
> = props => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <ol
      class={cn(
        'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
        local.class,
      )}
      {...rest}
    />
  );
};

export const BreadcrumbItem: ParentComponent<
  ComponentProps<'li'>
> = props => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <li
      class={cn('inline-flex items-center gap-1.5', local.class)}
      {...rest}
    />
  );
};

export const BreadcrumbLink: ParentComponent<
  ComponentProps<'a'> & {
    asChild?: boolean;
  }
> = props => {
  const [local, rest] = splitProps(props, ['class', 'asChild']);

  return (
    <a
      class={cn('transition-colors hover:text-foreground', local.class)}
      {...rest}
    />
  );
};

export const BreadcrumbPage: ParentComponent<
  ComponentProps<'span'>
> = props => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      class={cn('font-normal text-foreground', local.class)}
      {...rest}
    />
  );
};

export const BreadcrumbSeparator: ParentComponent<
  ComponentProps<'li'>
> = props => {
  const [local, rest] = splitProps(props, ['class', 'children']);

  return (
    <li
      role="presentation"
      aria-hidden="true"
      class={cn('[&>svg]:w-3.5 [&>svg]:h-3.5', local.class)}
      {...rest}
    >
      {local.children ?? <IconChevronRight />}
    </li>
  );
};

export const BreadcrumbEllipsis: ParentComponent<
  ComponentProps<'span'>
> = props => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <span
      role="presentation"
      aria-hidden="true"
      class={cn('flex h-9 w-9 items-center justify-center', local.class)}
      {...rest}
    >
      <IconDots class="h-4 w-4" />
      <span class="sr-only">More</span>
    </span>
  );
};

export type BreadcrumbEntry = {
  /**
   * Content to display (string or JSX).
   **/
  content: JSXElement;

  /**
   * Href for navigation.
   **/
  href: string;
};

export interface BreadcrumbsProps {
  /**
   * Array of items to display in the breadcrumb.
   **/
  entries: BreadcrumbEntry[];
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <For each={props.entries}>
          {(entry, index) => (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={entry.href}
                  onClick={e => {
                    // Skip navigation if the current entry is the last one.
                    if (index() === props.entries.length - 1) {
                      e.preventDefault();
                    }
                  }}
                >
                  {entry.content}
                </BreadcrumbLink>
              </BreadcrumbItem>

              <Show when={index() !== props.entries.length - 1}>
                <BreadcrumbSeparator />
              </Show>
            </>
          )}
        </For>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
