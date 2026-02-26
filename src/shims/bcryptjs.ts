export async function hash(value: string, _rounds: number) {
  return `hashed:${value}`;
}
export async function compare(value: string, hashed: string) {
  return hashed === `hashed:${value}`;
}

const bcrypt = { hash, compare };
export default bcrypt;
