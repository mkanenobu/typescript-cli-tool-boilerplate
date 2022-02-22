import { hello } from "../src";

test("Function 'hello' returns 'Hello, World!'", () => {
  expect(hello()).toBe("Hello, World!");
});
