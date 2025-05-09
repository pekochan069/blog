import { Show } from "solid-js";
import {
  PaginationEllipsis,
  PaginationItem,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationRoot,
} from "~/components/ui/pagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function Pagination(props: PaginationProps) {
  return (
    <PaginationRoot
      count={props.totalPages}
      page={props.currentPage}
      itemComponent={(itemProps) => (
        <PaginationItem page={itemProps.page} as="a" href={`/${itemProps.page}`}>
          {itemProps.page}
        </PaginationItem>
      )}
      ellipsisComponent={() => <PaginationEllipsis />}
    >
      <Show when={props.currentPage > 1}>
        <PaginationPrevious as="a" href={`/${props.currentPage - 1}`} />
      </Show>
      <PaginationItems />
      <Show when={props.currentPage < props.totalPages}>
        <PaginationNext as="a" href={`/${props.currentPage + 1}`} />
      </Show>
    </PaginationRoot>
  );
}
