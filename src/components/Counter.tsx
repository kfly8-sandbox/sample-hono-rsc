"use client"

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)} className="font-bold py-2 px-4 rounded bg-black text-white">
        Click me
      </button>
      count: {count}
    </>
  );
}
