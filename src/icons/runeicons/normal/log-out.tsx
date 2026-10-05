import type { JSX } from "@solidjs/web";

/** Icon from Rune Icons by Rune Icons team - https://github.com/Runeicons/runeicons/blob/main/LICENSE */
export function LogOutIcon(props: JSX.IntrinsicElements["svg"]) {
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
              d="M16 7L21 12L16 17M21 12H9M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
              stroke="black"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
