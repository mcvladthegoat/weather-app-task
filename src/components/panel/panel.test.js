import React from "react";
import { render, screen } from "@testing-library/react";
import Panel from "./index";

describe("<Panel />", () => {
  test("Panel component renders", () => {
    render(<Panel>panel content</Panel>);
    const linkElement = screen.getByText(/panel content/i);
    expect(linkElement).toBeInTheDocument();
  });
});
