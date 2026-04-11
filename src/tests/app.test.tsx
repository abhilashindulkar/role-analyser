import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

function renderApp(route = "/") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
}

describe("App", () => {
  it("renders the Permiso header", () => {
    renderApp();
    expect(screen.getByText("Permiso")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    renderApp();
    expect(screen.getAllByText("Explore").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Compare").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Permissions").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Advisor").length).toBeGreaterThanOrEqual(1);
  });
});
