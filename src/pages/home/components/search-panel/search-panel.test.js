import React from "react";
import enzyme from "../../../../../config/enzyme";
import i18n from "i18next";
import SearchPanel from ".";

describe("<SearchPanel />", () => {
  it("SearchPanel renders", () => {
    const result = enzyme.mount(<SearchPanel />);

    expect(result.find("button").text()).toBe(i18n.t("pages.home.search.btn"));
    expect(result.exists(".wrapper")).toBeTruthy();
    expect(result.find("input").exists()).toBeTruthy();
  });
});
