import React from "react";
import App from "../src/App";
import { describe, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

describe("App", () => {
  test("renders headline", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });
});
