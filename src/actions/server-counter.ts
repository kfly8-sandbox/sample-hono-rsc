"use server"

let count = 0;

export const currentCount = async () => {
  return count;
}

export const incrementCount = async () => {
  count += 1;
}

