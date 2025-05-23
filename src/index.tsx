import { Hono } from 'hono'
import { renderer } from './renderer'

import { Counter } from './components/Counter'
import { SuspenseDemo } from './components/SuspenseDemo'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {

  return c.render(
    <>
      <Counter />
      <SuspenseDemo />
    </>
  )
})

export default import.meta.env.DEV ? app.fetch : app;
