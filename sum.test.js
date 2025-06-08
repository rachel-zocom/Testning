import { sum, sub } from "./script.js";

describe("sum", () => {
  test("adds två numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });
});

describe("sub", () => {
  test("subracts two numbers", () => {
    expect(sub(4, 3)).toBe(1);
  });
});

//När vi anropar funktionen sum med 2 och 3 som argument, ska resultatet vara exakt 5.
//Om så är fallet klarar testet och Jest visar en grön bock. Om resultatet inte är 5, misslyckas testet och Jest visar ett fel.

// Definiera ett test:
// test('beskrivning', () => {
// 	// Testkod här
//   });
