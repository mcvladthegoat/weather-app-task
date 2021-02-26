import React from "react";
import enzyme from "../../../config/enzyme";
import LocationIcon from ".";

describe("<LocationIcon />", () => {
  it("LocationIcon component renders", () => {
    const element = enzyme.shallow(<LocationIcon />);
    expect(element.find(".wrapper").exists()).toBeTruthy();
    expect(element.find(".icon").exists()).toBeTruthy();
  });

  it("LocationIcon component renders with withLabel prop", () => {
    const element = enzyme.shallow(<LocationIcon label="test label" />);
    expect(element.find("span").text()).toBe("test label");
  });

  it("LocationIcon component renders with fading prop", () => {
    const element = enzyme.shallow(<LocationIcon fading />);
    expect(element.find(".icon").hasClass("fading")).toBeTruthy();
  });

  it("LocationIcon component renders with size=md prop", () => {
    const element = enzyme.shallow(<LocationIcon size="md" />);
    expect(element.find(".icon").hasClass("md")).toBeTruthy();
  });

  it("LocationIcon click event", () => {
    const mockCallBack = jest.fn();
    const element = enzyme.shallow(<LocationIcon onClick={mockCallBack} />);
    element.find(".wrapper").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
