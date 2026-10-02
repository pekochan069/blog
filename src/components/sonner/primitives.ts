import { createSignal, onSettled } from "solid-js";

export function useIsDocumentHidden() {
  const [isDocumentHidden, setIsDocumentHidden] = createSignal(
    globalThis.document?.hidden ?? false
  );
  const callback = () => setIsDocumentHidden(document.hidden);

  onSettled(() => {
    document.addEventListener("visibilitychange", callback);
    return () => document.removeEventListener("visibilitychange", callback);
  });

  return isDocumentHidden;
}
