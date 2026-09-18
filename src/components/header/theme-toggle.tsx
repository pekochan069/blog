import { createEffect, createSignal, onSettled } from "solid-js";

import { Toggle } from "#components/ui/toggle";
import { MoonIcon } from "#icons/runeicons/normal/moon";
import { SunIcon } from "#icons/runeicons/normal/sun";

export function ThemeToggle() {
  let ref: HTMLDivElement;
  const [theme, setTheme] = createSignal<"light" | "dark">("light");
  let mermaidRender = Promise.resolve();

  const onClick = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  onSettled(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  });

  createEffect(
    () => ({
      currentTheme: theme(),
    }),
    ({ currentTheme }) => {
      const isDark = currentTheme === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.dataset.theme = isDark ? "catppuccin-macchiato" : "catppuccin-latte";

      // @ts-expect-error: mermaid
      const { mermaid } = window;
      const diagrams = document.querySelectorAll<HTMLElement>(".mermaid[data-mermaid-source]");
      if (mermaid && diagrams.length > 0) {
        // oxlint-disable-next-line promise/prefer-await-to-then
        mermaidRender = mermaidRender.then(async () => {
          mermaid.initialize({
            startOnLoad: false,
            theme: currentTheme === "light" ? "default" : "dark",
          });

          for (const diagram of diagrams) {
            diagram.textContent = diagram.dataset.mermaidSource ?? "";
            delete diagram.dataset.processed;
          }

          await mermaid.run({ nodes: diagrams });
        });
      }
    }
  );

  return (
    <Toggle
      aria-label="다크 모드"
      class="group size-9 p-0"
      onClick={onClick}
      pressed={theme() === "dark"}
    >
      <div aria-hidden="true" class="relative size-8 shrink-0 overflow-hidden" ref={ref!}>
        <div class="absolute top-1 left-1 size-6 origin-[50%_44px] rotate-0 transition-transform duration-280 ease-[linear(0,0.4_15%,0.8_30%,1.06_50%,1.025_70%,1)] group-hover:-rotate-8 group-focus-visible:-rotate-8 motion-reduce:transition-none dark:-rotate-65 dark:group-hover:-rotate-46 dark:group-focus-visible:-rotate-46">
          <SunIcon class="size-6" />
          <span class="sr-only">라이트</span>
        </div>
        <div class="absolute top-1 left-1 size-6 origin-[50%_44px] rotate-65 transition-transform duration-280 ease-[linear(0,0.4_15%,0.8_30%,1.06_50%,1.025_70%,1)] group-hover:rotate-46 group-focus-visible:rotate-46 motion-reduce:transition-none dark:rotate-0 dark:group-hover:rotate-8 dark:group-focus-visible:rotate-8">
          <MoonIcon class="size-6" />
          <span class="sr-only">다크</span>
        </div>
      </div>
    </Toggle>
  );
}
