import React from "react";
import enzyme from "../../../../../../../../config/enzyme";
import NoteItem from ".";

describe("<NoteItem />", () => {
  it("NoteItem component renders", () => {
    const element = enzyme.shallow(<NoteItem />);
    expect(element.find(".item").exists()).toBeTruthy();
  });
});
