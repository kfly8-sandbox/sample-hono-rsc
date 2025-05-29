import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { renderer } from './renderer'
import { contextStorage } from 'hono/context-storage'

import { Counter } from './components/Counter'
import { SuspenseDemo } from './components/SuspenseDemo'
import { ServerCounter } from './components/ServerCounter'

export type Env = {
  SELF: Fetcher;
}

const app = new Hono<{ Bindings: Env }>()

app.use(renderer)
import.meta.env.DEV && ( app.use(logger()) )
app.use(contextStorage())

app.get('/', (c) => {
  return c.render(
    <>
    <h1 className="text-3xl font-bold underline">Hello Hono + RSC</h1>
      <Counter />
      <SuspenseDemo />
    </>
  )
})

const api = app.get('/api/hello', async (c) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return c.json({ message: "HELLO" })
})

app.on(['GET', 'POST'], '/server-counter', async (c) => {

  return c.render(
    <>
      <ServerCounter />
    </>
  )
})

export default app.fetch
export type ApiType = typeof api
