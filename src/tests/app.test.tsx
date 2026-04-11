import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("App", () => {
  it("renders the Permiso header", () => {
    render(
      <BrowserRouter basename="/role-analyser">
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText("Permiso")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    render(
      <BrowserRouter basename="/role-analyser">
        <App />
      </BrowserRouter>
    );
    expect(screen.getAllByText("Explore").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Compare").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Permissions").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Advisor").length).toBeGreaterThanOrEqual(1);
  });
});
