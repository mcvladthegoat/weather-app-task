import React from "react";
import enzyme from "../../../config/enzyme";
import Loader from ".";

describe("<Loader />", () => {
  it("Loader component renders", () => {
    const element = enzyme.shallow(<Loader />);
    expect(element.find("img").exists()).toBeTruthy();
  });
});
