import type { InputProps, MenuItemProps } from "@solid2-aria/components";

export function isTextValue(
  value: InputProps["aria-label"] | MenuItemProps["children"]
): value is string {
  return typeof value === "string";
}
