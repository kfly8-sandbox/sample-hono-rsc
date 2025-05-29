import { getContext } from 'hono/context-storage'
import { Suspense } from 'react';
import type { Env } from '../server';

export function SuspenseDemo() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MessageBox />
    </Suspense>
  )
}

async function MessageBox() {
  const c = getContext<{Bindings: Env}>()
  const origin = new URL(c.req.url).origin;

  // Service bindingを使用して自己参照問題を解決
  let message: string;

  try {
    if (c.env?.SELF) {
      const res = await c.env.SELF.fetch(new Request(`${origin}/api/hello`));

      if (!res.ok) {
        throw new Error(`Service binding request failed: ${res.status}`);
      }

      const data = await res.json() as { message: string };
      message = data.message;
    } else {
      const res = await fetch(`${origin}/api/hello`);

      if (!res.ok) {
        throw new Error("Failed to fetch hello message".concat(` Status: ${res.status}`));
      }

      const data = await res.json() as { message: string };
      message = data.message;
    }
  } catch (error) {
    console.error('Error in MessageBox:', error);
    throw error;
  }

  return <p>Message: {message}</p>;
}
