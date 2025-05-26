import { currentCount, incrementCount } from '../actions/server-counter'

export async function ServerCounter() {
  const count = await currentCount();

  return (
    <form action={incrementCount} >
      <button className="font-bold py-2 px-4 rounded bg-black text-white">
        Click me
      </button>
      count: {count}
    </form>
  );
}
