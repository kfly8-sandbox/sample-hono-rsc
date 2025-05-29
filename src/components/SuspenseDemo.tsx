import { hc } from 'hono/client'
import type { ApiType } from '../server'
import { getContext } from 'hono/context-storage'
import { Suspense } from 'react';

export function SuspenseDemo() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MessageBox />
    </Suspense>
  )
}

async function MessageBox() {
  const c = getContext()
  const origin = new URL(c.req.url).origin;

  // Service bindingを使用して自己参照問題を解決
  let message: string;

  try {
    if (c.env?.SELF) {
      // Service binding を使用（推奨）
      console.log('Using service binding');
      const res = await c.env.SELF.fetch(new Request(`${origin}/api/hello`));

      if (!res.ok) {
        throw new Error(`Service binding request failed: ${res.status}`);
      }

      const data = await res.json() as { message: string };
      message = data.message;
    } else {
      console.log('Using direct fetch (development):', `${origin}/api/hello`);
      const res = await fetch(`${origin}/api/hello`);

      if (!res.ok) {
        console.error({
          status: res.status,
          origin,
        });
        throw new Error("Failed to fetch hello message");
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
