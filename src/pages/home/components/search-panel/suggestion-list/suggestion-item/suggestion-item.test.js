import React from "react";
import enzyme from "../../../../../../../config/enzyme";
import SuggestionItem from ".";

describe("<SuggestionItem />", () => {
  const mockData = {
    id: "12.34,56.78",
    name: "Test suggestion item",
  };
  const element = enzyme.shallow(<SuggestionItem data={mockData} />);

  it("SuggestionItem renders", () => {
    expect(element.find(".item").text()).toBe("Test suggestion item");
  });
});
