import React from "react";
import enzyme from "../../../../../config/enzyme";
import i18n from "i18next";
import Status from ".";

describe("<Status />", () => {
  let mockUserLocation = {
    requested: false,
    id: null,
  };

  it("Status renders ONLY loading span", () => {
    const result = enzyme.mount(
      <Status userLocation={mockUserLocation} loading />
    );
    expect(result.find(".loading").text()).toBe(i18n.t("pages.home.loading"));
  });

  it("Status renders error text and loading span", () => {
    const result = enzyme.mount(
      <Status userLocation={mockUserLocation} loading error="error text" />
    );
    expect(result.find(".loading").text()).toBe(i18n.t("pages.home.loading"));
    expect(result.find(".error").text()).toBe("error text");
  });

  it(`Status renders ONLY "${i18n.t(
    "pages.home.location-icon.finding-label"
  )}" label`, () => {
    const result = enzyme.mount(<Status userLocation={mockUserLocation} />);
    expect(result.find("span").text()).toBe(
      i18n.t("pages.home.location-icon.finding-label")
    );
  });

  it(`Status renders ONLY "${i18n.t(
    "pages.home.location-icon.open-page-label"
  )}" label`, () => {
    mockUserLocation = {
      requested: true,
      id: "12.34,56.78",
    };
    const result = enzyme.mount(<Status userLocation={mockUserLocation} />);
    expect(result.find("span").text()).toBe(
      i18n.t("pages.home.location-icon.open-page-label")
    );
  });

  it(`Status renders ONLY .wrapper without children (when user denied location request)`, () => {
    mockUserLocation = {
      requested: true,
      id: "",
    };
    const result = enzyme.mount(<Status userLocation={mockUserLocation} />);
    expect(result.exists("span")).toBeFalsy();
    expect(result.exists(".error")).toBeFalsy();
    expect(result.exists(".loading")).toBeFalsy();
    expect(result.exists(".wrapper")).toBeTruthy();
  });
});
