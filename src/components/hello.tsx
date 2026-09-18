import { createSignal } from "solid-js";

export function Hello() {
  const [number, setNumber] = createSignal(0);

  return (
    <div>
      <button onClick={() => setNumber((prev) => prev - 1)}>-1</button>
      <p>{number()}</p>
      <button onClick={() => setNumber((prev) => prev + 1)}>+1</button>
    </div>
  );
}
