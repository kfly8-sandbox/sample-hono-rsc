import { Suspense } from 'react';
import { fetchHello } from '../api/hello';

export function SuspenseDemo() {

  return (
    <Suspense fallback={<Loading />}>
      <MessageBox />
    </Suspense>
  )
}

async function MessageBox() {
  const message = await fetchHello();
  return <p>Message: {message}</p>;
}

function Loading() {
  return <p>Message: <span className="animate-pulse">Loading ...</span></p>;
}
