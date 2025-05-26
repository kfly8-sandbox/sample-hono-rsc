import { Hono } from 'hono'
import { renderer } from './renderer'

import { Counter } from './components/Counter'
import { SuspenseDemo } from './components/SuspenseDemo'
import { ServerCounter } from './components/ServerCounter'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {

  return c.render(
    <>
      <h1 className="text-3xl font-bold underline">Hono RSC Demo</h1>
      <Counter />
      <SuspenseDemo />
    </>
  )
})

app.on(['GET', 'POST'], '/server-counter', async (c) => {

  return c.render(
    <>
      <ServerCounter />
    </>
  )
})

export default app.fetch
