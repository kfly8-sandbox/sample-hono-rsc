import { Suspense } from 'react';

async function fetchHello() {
  const response = await fetch( import.meta.env.DEV ? "http://localhost:5173/api/hello" : "http://localhost:4173/api/hello", {
    cache: 'no-store' // 毎回新しいデータを取得
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data as { message: string };
}

export function SuspenseDemo() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MessageBox />
    </Suspense>
  )
}

async function MessageBox() {
  const message = await fetchHello().then(data => data.message);

  return <p>Message: {message}</p>
}

