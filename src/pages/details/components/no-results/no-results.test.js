import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NoResults from "./";

describe("<NoResults />", () => {
  test("NoResults component renders (with router)", () => {
    render(
      <MemoryRouter>
        <NoResults error={"no found results"}></NoResults>
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/no found results/i);
    expect(linkElement).toBeInTheDocument();
  });
});
