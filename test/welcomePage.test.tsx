import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import WelcomePage from "../src/pages/WelcomePage";

test("renders welcome page correctly", () => {
  render(
    <Router>
      <WelcomePage />
    </Router>,
  );

  // Assert Header and button links work
  expect(
    screen.getByText(
      "Introducing indiK8or: Simplify and Visualize Your Kubernetes Environment",
    ),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Sign in" }) as HTMLInputElement,
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Sign up" }) as HTMLInputElement,
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Ivy Wang" }) as HTMLInputElement,
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Julian Babon" }) as HTMLInputElement,
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Yueran Li" }) as HTMLInputElement,
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Tadd LeRocque" }) as HTMLInputElement,
  ).toBeInTheDocument();
});
