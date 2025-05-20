import { Mermaid } from "mermaid";

declare var pagefind: unknown | null;
declare var mermaid: Mermaid | undefined;

interface Window {
  pagefind: unknown | null;
  mermaid: Mermaid | undefined;
}
