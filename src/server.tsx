import { Hono } from 'hono'
import { renderer } from './renderer'

import { Counter } from './components/Counter'
import { SuspenseDemo } from './components/SuspenseDemo'

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

export default app.fetch
