import React from "react";
import enzyme from "../../../../../config/enzyme";
import i18n from "i18next";
import Status from ".";
import { LocationIcon } from "../../../../components";

describe("<Status />", () => {
  it(`Status renders when location requested and prop 'loading'=true`, () => {
    const result = enzyme.mount(<Status userLocationRequested loading />);
    expect(result.find("span").text()).toBe(i18n.t("pages.home.loading"));
  });

  it(`Status renders when location is NOT requested`, () => {
    const result = enzyme.mount(<Status userLocationRequested={false} />);
    expect(result.find(LocationIcon).length).toBe(1);
  });
});
