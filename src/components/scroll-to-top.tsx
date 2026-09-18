import { onSettled } from "solid-js";

import { Button } from "#components/ui/button";
import { ArrowUpFromLineIcon } from "#icons/runeicons/normal/arrow-up-from-line";

export function ScrollToTop() {
  onSettled(() => {
    const scrollToTopButton = document.querySelector<HTMLButtonElement>("#scroll-to-top");

    const onScroll = () => {
      scrollToTopButton!.dataset["show"] = window.scrollY > 99 ? "true" : "false";
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <Button
      id="scroll-to-top"
      class="ease-out-circ data-[show=true]:ease-spring fixed right-8 bottom-8 size-12 translate-y-20 transition-transform duration-200 data-[show=true]:translate-y-0 data-[show=true]:duration-300 motion-reduce:transition-none"
      variant="primary"
      onClick={() => {
        globalThis.window.scrollTo(0, 0);
      }}
    >
      <ArrowUpFromLineIcon class="size-7" />
    </Button>
  );
}
