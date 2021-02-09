import React from "react";
import enzyme from "../../../../../config/enzyme";
import i18n from "i18next";
import { i18nextInit } from "../../../../translation";
import SearchPanel from ".";

describe("<SearchPanel />", () => {
  i18nextInit();

  it("SearchPanel renders", () => {
    const result = enzyme.mount(<SearchPanel />);

    expect(result.find("button").text()).toBe(i18n.t("pages.home.search.btn"));
    expect(result.find("div").first().hasClass("wrapper")).toBeTruthy();
    expect(result.find("input").exists()).toBeTruthy();
  });
});
