"use client"

import { use } from 'react'
import { Suspense } from 'react';
import { fetchHello } from '../api/hello';

export function SuspenseDemo() {
  const messagePromise = fetchHello();

  return (
    <Suspense fallback={<Loading />}>
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

function Loading() {
  return <p>Message: <span className="animate-pulse">Loading ...</span></p>;
}
