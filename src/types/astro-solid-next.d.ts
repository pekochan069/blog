declare module "astro-solid-next" {
  import type { AstroIntegration } from "astro";
  import type { FilterPattern } from "vite";

  export default function solidNext(options?: {
    readonly include?: FilterPattern;
    readonly exclude?: FilterPattern;
  }): AstroIntegration;
}
