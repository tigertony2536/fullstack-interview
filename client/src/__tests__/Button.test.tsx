/**
 * @jest-environment jsdom
 */

import React from "react";
import { Button } from "../components/Button";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

global.alert = jest.fn();

describe("test Button", () => {
  beforeEach(() => {
    render(<Button onClick={() => alert("Hello world")}>Button</Button>);
  });

  it("should render a button", () => {
    expect(screen.getByText(/Button/i)).toBeInTheDocument();
  });

  it("should tricker function onClick", () => {
    expect(alert).toHaveBeenCalledTimes(0);
    screen.getByText(/Button/i).click();
    expect(alert).toHaveBeenCalledTimes(1);
  });
});
