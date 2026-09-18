import type { ComponentProps } from "@solidjs/web";
import { cn } from "cn";
import { merge, omit } from "solid-js";

import { Fa7SolidEllipsis } from "#icons/fa7/solid/ellipsis";
import { ChevronLeftIcon } from "#icons/runeicons/normal/chevron-left";
import { ChevronRightIcon } from "#icons/runeicons/normal/chevron-right";

import { ButtonAnchor } from "./button";

function Pagination(props: ComponentProps<"nav">) {
  const rest = omit(props, "class");

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      class={cn("mx-auto flex w-full justify-center", props.class)}
      {...rest}
    />
  );
}

function PaginationContent(props: ComponentProps<"ul">) {
  const rest = omit(props, "class");

  return (
    <ul
      data-slot="pagination-content"
      class={cn("flex items-center gap-0.5", props.class)}
      {...rest}
    />
  );
}

function PaginationItem({ ...props }: ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ComponentProps<typeof ButtonAnchor>, "size"> &
  ComponentProps<"a">;

function PaginationLink(props: PaginationLinkProps) {
  const merged = merge(
    { size: "icon", isActive: false } satisfies Partial<PaginationLinkProps>,
    props
  );
  const rest = omit(merged, "disabled", "isActive", "size");

  return (
    <ButtonAnchor
      variant={merged.isActive ? "primary" : "ghost"}
      size={merged.size}
      aria-current={merged.isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={merged.isActive}
      data-disabled={merged.disabled}
      {...rest}
    />
  );
}

function PaginationPrevious(props: ComponentProps<typeof PaginationLink> & { text?: string }) {
  const merged = merge(
    { text: "이전" } satisfies Partial<ComponentProps<typeof PaginationLink> & { text?: string }>,
    props
  );
  const rest = omit(merged, "class");

  return (
    <PaginationLink
      aria-label="이전 페이지로 이동"
      size="md"
      class={cn("pl-1.5!", merged.class)}
      {...rest}
    >
      <ChevronLeftIcon data-icon="inline-start" class="cn-rtl-flip" />
      <span class="hidden sm:block">{merged.text}</span>
    </PaginationLink>
  );
}

function PaginationNext(props: ComponentProps<typeof PaginationLink> & { text?: string }) {
  const merged = merge({ text: "다음" }, props);
  const rest = omit(merged, "class", "text");

  return (
    <PaginationLink
      aria-label="다음 페이지로 이동"
      size="md"
      class={cn("pr-1.5!", merged.class)}
      {...rest}
    >
      <span class="hidden sm:block">{merged.text}</span>
      <ChevronRightIcon data-icon="inline-end" class="cn-rtl-flip" />
    </PaginationLink>
  );
}

function PaginationEllipsis(props: ComponentProps<"span">) {
  const rest = omit(props, "class");

  return (
    <span
      aria-hidden="true"
      data-slot="pagination-ellipsis"
      class={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        props.class
      )}
      {...rest}
    >
      <Fa7SolidEllipsis />
      <span class="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
