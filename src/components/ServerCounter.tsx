import { changeCounter, getCounter, resetCounter } from '../actions/server-counter'

export const ServerCounter = async () => {

  return (
    <form action={ changeCounter } >
      <input type="hidden" name="change" value="1" />
      <button>Server Counter: {getCounter()}</button>
      <button formAction={resetCounter}>Server Reset</button>
    </form>
  )
}
