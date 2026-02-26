export function describe(_name: string, fn: () => void) { fn(); }
export function it(_name: string, fn: () => void) { fn(); }
export function expect(received: unknown) {
  return {
    toBe(expected: unknown) {
      if (received !== expected) throw new Error(`Expected ${String(received)} to be ${String(expected)}`);
    },
  };
}
