import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("Clear button resets the display", () => {
  render(<App />);

  fireEvent.click(screen.getByText("1"));
  fireEvent.click(screen.getByText("2"));

  expect(screen.getByRole("textbox").value).toBe("12");

  fireEvent.click(screen.getByText("Clear"));

  expect(screen.getByRole("textbox").value).toBe("");
});

test("Calculate button computes the correct result", () => {
  render(<App />);

  fireEvent.click(screen.getByText("7"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("5"));

  expect(screen.getByRole("textbox").value).toBe("7+5");

  fireEvent.click(screen.getByText("="));

  expect(screen.getByRole("textbox").value).toBe("12");
});
