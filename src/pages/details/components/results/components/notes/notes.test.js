import React from "react";
import enzyme from "../../../../../../../config/enzyme";
import Notes from ".";

describe("<Notes />", () => {
  it("Notes component renders", () => {
    const element = enzyme.shallow(<Notes />);
    expect(element.find(".wrapper").exists()).toBeTruthy();
  });
});
