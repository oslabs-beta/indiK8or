import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, test } from "vitest";
import HomePage from "../src/pages/HomePage";

describe("sidebar", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
  });
  test("does not render Sidebar and Dashboard components if isLoggedIn state is false", async () => {
    await waitFor(() => {
      const screenComponent = screen.queryByTestId(
        "screenComponent",
      ) as HTMLInputElement;
      expect(screenComponent).toBe(null);
    });
  });

  screen.debug();
});
