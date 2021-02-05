import React from "react";
import { render, screen } from "@testing-library/react";
import enzyme from "../../../config/enzyme";
import Btn from "./";

describe("<Btn />", () => {
  test("Btn component renders", () => {
    render(<Btn>inner text</Btn>);
    const linkElement = screen.getByText(/inner text/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Btn component click event", () => {
    const mockCallBack = jest.fn();

    const button = enzyme.shallow(
      <Btn onClick={mockCallBack}>Click test btn</Btn>
    );
    button.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
