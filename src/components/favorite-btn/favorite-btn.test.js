import React from "react";
import enzyme from "../../../config/enzyme";
import i18n from "i18next";
import FavoriteBtn from ".";

describe("<FavoriteBtn />", () => {
  it("FavoriteBtn component renders", () => {
    const button = enzyme.mount(<FavoriteBtn />);
    expect(button.find("button").prop("title")).toBe(
      i18n.t("pages.details.favorite.false")
    );
    expect(button.find("svg")).toBeTruthy();
  });

  it("FavoriteBtn component renders with favorite=true", () => {
    const button = enzyme.mount(<FavoriteBtn favorite />);
    expect(button.find("button").prop("title")).toBe(
      i18n.t("pages.details.favorite.true")
    );
  });

  it("FavoriteBtn component renders with favorite=false", () => {
    const button = enzyme.mount(<FavoriteBtn favorite={false} />);
    expect(button.find("button").prop("title")).toBe(
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
