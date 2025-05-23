"use client"

import { use } from 'react'
import { Suspense } from 'react';
import { fetchHello } from '../api/hello';

export function SuspenseDemo() {
  const messagePromise = fetchHello();

  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <MessageBox messagePromise={messagePromise} />
    </Suspense>
  )
}

type MessageBoxProps = {
  messagePromise: Promise<string>
}

function MessageBox({ messagePromise }: MessageBoxProps) {
  const message = use(messagePromise);
  return <p>Message: {message}</p>;
}

