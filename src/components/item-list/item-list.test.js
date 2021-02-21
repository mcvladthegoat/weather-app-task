import React from "react";
import enzyme from "../../../config/enzyme";
import i18n from "i18next";
import ItemList from ".";

describe("<ItemList />", () => {
  it("ItemList component renders without items", () => {
    const element = enzyme.mount(
      <ItemList
        keyPrefix={"test-1"}
        itemTemplate={<p></p>}
        noItemsText="no items test"
      />
    );
    expect(element.find(".noItemsText").text()).toBe("no items test");
  });

  const mockData = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];

  const TestItemTemplate = () => <p></p>;

  const element = enzyme.mount(
    <ItemList
      keyPrefix={"test-1"}
      itemTemplate={<TestItemTemplate />}
      items={mockData}
      noItemsText="no items test"
    />
  );

  it("ItemList component renders with items", () => {
    expect(element.find("p").length).toBe(mockData.length);
  });

  it("ItemList component handle edit btn click", () => {
    element.find("button").simulate("click");
    expect(element.find("button").text()).toBe(
      i18n.t("item-list.edit-btn.true")
    );
  });

  it("ItemList component handle edit btn click (isEditable=false)", () => {
    element.find("button").simulate("click");
    expect(element.find("button").text()).toBe(
      i18n.t("item-list.edit-btn.false")
    );
  });
});
