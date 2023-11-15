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
  test("Sidebar and Dashboard components should render", async () => {
    await waitFor(() => {
      const screenComponent = screen.queryByTestId(
        "screenComponent",
      ) as HTMLInputElement;
      expect(screenComponent).not.toBe(null);
    });
  });

  screen.debug();
});
