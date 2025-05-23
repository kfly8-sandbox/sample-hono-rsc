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
      <Counter />
      <SuspenseDemo />
      <ServerCounter />
    </>
  )
})

export default app.fetch
