import type { JSX } from "solid-js";

export function TablerArrowUp(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 5v14m6-8l-6-6m-6 6l6-6"
      />
    </svg>
  );
}
