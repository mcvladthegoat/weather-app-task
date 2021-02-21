import React from "react";
import enzyme from "../../../config/enzyme";
import i18n from "i18next";
import LocationIcon from ".";

describe("<LocationIcon />", () => {
  it("LocationIcon component renders", () => {
    const element = enzyme.shallow(<LocationIcon />);
    expect(element.find("img").exists()).toBeTruthy();
  });

  it("LocationIcon component renders with withLabel prop", () => {
    const element = enzyme.shallow(<LocationIcon withLabel />);
    expect(element.find("span").text()).toBe(i18n.t("location-icon.label"));
  });

  it("LocationIcon component renders with fading prop", () => {
    const element = enzyme.shallow(<LocationIcon fading />);
    expect(element.find("img").hasClass("fading")).toBeTruthy();
  });

  it("LocationIcon component renders with size=md prop", () => {
    const element = enzyme.shallow(<LocationIcon size="md" />);
    expect(element.find("img").hasClass("md")).toBeTruthy();
  });
});
