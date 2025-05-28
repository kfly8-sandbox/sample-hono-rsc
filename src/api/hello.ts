
export const fetchHello = async () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Hello World");
    }, 1000);
  })
}

