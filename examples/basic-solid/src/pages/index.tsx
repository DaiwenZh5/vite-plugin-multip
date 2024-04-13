import { createSignal } from "solid-js";

export default function Home() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <h1>Hello World!</h1>
      <button onClick={() => setCount(count() + 1)}>Increment</button>
      <p>Count: {count()}</p>
    </div>
  )
}
