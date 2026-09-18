import type { JSX } from "@solidjs/web";

export function LayoutGridIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      width="100%"
      height="100%"
      {...props}
    >
      <rect x="0" y="0" width="24" height="24" rx="2.250" ry="2.250" fill="transparent" />
      <g transform="translate(0.75, 0.75) scale(0.9375)">
        <g
          transform="translate(12, 12) rotate(0) scale(1, 1) translate(-12, -12)"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <g class="icon-anim-container icon-anim-group">
            <path
              d="M9 3H4C3.44772 3 3 3.44772 3 4V9C3 9.55228 3.44772 10 4 10H9C9.55228 10 10 9.55228 10 9V4C10 3.44772 9.55228 3 9 3Z"
              stroke="currentColor"
            />
            <path
              d="M20 3H15C14.4477 3 14 3.44772 14 4V9C14 9.55228 14.4477 10 15 10H20C20.5523 10 21 9.55228 21 9V4C21 3.44772 20.5523 3 20 3Z"
              stroke="currentColor"
            />
            <path
              d="M20 14H15C14.4477 14 14 14.4477 14 15V20C14 20.5523 14.4477 21 15 21H20C20.5523 21 21 20.5523 21 20V15C21 14.4477 20.5523 14 20 14Z"
              stroke="currentColor"
            />
            <path
              d="M9 14H4C3.44772 14 3 14.4477 3 15V20C3 20.5523 3.44772 21 4 21H9C9.55228 21 10 20.5523 10 20V15C10 14.4477 9.55228 14 9 14Z"
              stroke="currentColor"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
