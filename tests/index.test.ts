import { test, expect } from "vitest";
import { hello } from "../src";

test("Function 'hello' returns 'Hello, World!'", () => {
  expect(hello()).toBe("Hello, World!");
});
