"use server";

let count = 0

export async function changeCounter(formData: FormData) : Promise<void> {
  const change = Number(formData.get("change"))
  count += change
}

export async function getCounter(): Promise<number> {
  return count
}

export async function resetCount(): Promise<void> {
  count = 0
}
