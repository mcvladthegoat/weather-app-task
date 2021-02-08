import React from "react";
import FavoriteBtn from ".";
import enzyme from "../../../../../../../config/enzyme";
import i18n from "i18next";
import { i18nextInit } from "../../../../../../translation";

describe("<FavoriteBtn />", () => {
  i18nextInit();

  it("FavoriteBtn component renders", () => {
    const button = enzyme.mount(<FavoriteBtn />);
    expect(button.find("button").text()).toBe(
      i18n.t("pages.details.favorite.false")
    );
  });

  it("FavoriteBtn component renders with favorite=true", () => {
    const button = enzyme.mount(<FavoriteBtn favorite />);
    expect(button.find("button").text()).toBe(
      i18n.t("pages.details.favorite.true")
    );
  });

  it("FavoriteBtn component renders with favorite=false", () => {
    const button = enzyme.mount(<FavoriteBtn favorite={false} />);
    expect(button.find("button").text()).toBe(
      i18n.t("pages.details.favorite.false")
    );
  });

  it("FavoriteBtn component click event", () => {
    const mockCallBack = jest.fn();

    const button = enzyme.mount(<FavoriteBtn onClick={mockCallBack} />);
    button.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
