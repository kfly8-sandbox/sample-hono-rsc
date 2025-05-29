import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { compress } from 'hono/compress'
import { renderer } from './renderer'
import { contextStorage } from 'hono/context-storage'

import { Counter } from './components/Counter'
import { SuspenseDemo } from './components/SuspenseDemo'
import { ServerCounter } from './components/ServerCounter'

const app = new Hono()

app.use(renderer)
app.use(logger())
//app.use(compress())
app.use(contextStorage())

app.get('/', (c) => {
  return c.render(
    <SuspenseDemo />
  )
})

const api = app.get('/api/hello', async (c) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return c.json({ message: 'HELLO' })
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
