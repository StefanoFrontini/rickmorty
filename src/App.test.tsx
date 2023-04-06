import { describe, test, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DataProvider } from "./context/context";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

import App from "./App";

describe("App", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    render(
      <BrowserRouter>
        <DataProvider>
          <App />
        </DataProvider>
      </BrowserRouter>
    );
  });

  test("Renders Rick & Morty DB link on the header", () => {
    expect(
      screen.getByRole("link", { name: "Rick & Morty DB" })
    ).toHaveAttribute("href", "/");
  });

  test("Renders user input on search form", () => {
    const input = screen.getByLabelText("search") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Morty" } });
    expect(input.value).toBe("Morty");
  });

  test("Renders the word Characters", async () => {
    const h1 = await screen.findByRole("heading", {
      level: 1,
    });
    expect(h1.textContent).toMatch(/characters/i);
  });

  test("Renders results data", async () => {
    const h4 = await screen.findByRole("heading", {
      level: 4,
    });
    expect(h4.textContent).toMatch(/showing/i);
  });

  test("Renders results on user input", async () => {
    const input = screen.getByLabelText("search") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "supernova" } });
    const h3 = await screen.findByRole(
      "heading",
      {
        level: 3,
      },
      { timeout: 2000 }
    );
    expect(h3.textContent).toMatch(/supernova/i);
  });

  test("Navigating to favorites route", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText(/favorites/i));
    const h1 = screen.getByRole("heading", {
      level: 1,
    });
    expect(h1.textContent).toMatch(/no favorite/);
  });

  test("Add to favorite and navigate to favorites", async () => {
    const user = userEvent.setup();
    const buttons = await screen.findAllByRole("button");
    await user.click(buttons[0]);
    await user.click(screen.getByRole("link", { name: "favorites" }));
    const h3 = screen.getAllByRole("heading", {
      level: 3,
    });
    expect(h3[0].textContent).toMatch(/rick sanchez/i);
  });
});

describe("Renders modal and bad page", () => {
  test("landing on a bad page", () => {
    const badRoute = "/badroute";
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <DataProvider>
          <App />
        </DataProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/dead end/i)).toBeInTheDocument();
  });

  test("Open modal", async () => {
    const route = "/character-detail";
    const state = {
      name: "Rick Sanchez",
      episode: ["https://rickandmortyapi.com/api/episode/1"],
      location: { name: "" },
    };
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: route,
            state,
          },
        ]}
      >
        <DataProvider>
          <App />
        </DataProvider>
      </MemoryRouter>
    );
    const h2 = await screen.findByRole("heading", { level: 2 });
    expect(h2.textContent).toMatch(/rick sanchez/i);
  });
});
