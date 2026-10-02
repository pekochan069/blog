# Solid 2 Sonner

Local MIT-licensed port of `solid-sonner/src`, checked against `sonner/src`. Uses the project's Solid 2 APIs; styles load automatically.

```tsx
import { Toaster, toast } from "#components/sonner";

export default function App() {
  return (
    <>
      <button onClick={() => toast.success("Saved")}>Save</button>
      <Toaster theme="system" richColors closeButton />
    </>
  );
}
```

Mount once per Solid application. Named toasters use `<Toaster id="editor" />` and `toast("Saved", { toasterId: "editor" })`.

Exports: `Toaster`, `toast`, `useSonner`, and public types. Supports promise/custom toasts, actions, positions, swipe dismissal, paused timers, icons and style overrides.

Run state regression checks: `bun test src/components/sonner/state.test.ts`. Browser verification covered client-only rendering. Astro SSR hydration was not verified; use `client:only="solid-js"` for a standalone Astro island. Do not call `toast()` in request-scoped server code: state is module-scoped.

Original licenses: `LICENSE` (solid-sonner), `SONNER-LICENSE.md` (Sonner).
