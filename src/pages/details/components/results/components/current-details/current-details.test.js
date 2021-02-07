import React from "react";
import CurrentDetails, { detailsKeyList } from "./";
import enzyme from "../../../../../config/enzyme";

describe("<CurrentDetails />", () => {
  let mockData = {};
  detailsKeyList.forEach((detailKey) => (mockData[detailKey] = "test value"));

  test(`CurrentDetails renders ${detailsKeyList.length} of ${
    Object.keys(mockData).length
  } <p> children`, () => {
    const result = enzyme.mount(<CurrentDetails data={mockData} />);
    expect(result.find("div p").length).toEqual(detailsKeyList.length);
  });

  test(`CurrentDetails renders 0 <p> children`, () => {
    const result = enzyme.mount(<CurrentDetails data={{}} />);
    expect(result.find("div p").length).toEqual(0);
  });

  test(`CurrentDetails renders ${detailsKeyList.length} <p> children, skips 2 data values`, () => {
    mockData["skip_me_1"] = "";
    mockData["skip_me_2"] = "";

    const result = enzyme.mount(<CurrentDetails data={mockData} />);
    expect(result.find("div p").length).toEqual(detailsKeyList.length);
  });
});
