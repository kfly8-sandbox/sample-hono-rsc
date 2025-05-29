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

  const client = hc<ApiType>(origin);
  const res = await client.api.hello.$get()
  if (!res.ok) {
    throw new Error("Failed to fetch hello message");
  }

  const data = await res.json();
  const message = data.message

  return <p>Message: {message}</p>;
}

