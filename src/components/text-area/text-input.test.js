import React from "react";
import enzyme from "../../../config/enzyme";
import TextArea from "./index";

describe("<TextArea />", () => {
  test("TextArea sets value", () => {
    const result = enzyme.mount(<TextArea value={"new value"} />);
    // result.find('textarea').simulate('change', { target: { value: 'new value' } });
    expect(result.find("textarea").text()).toEqual("new value");
  });

  test("TextArea renders error label in <span>", () => {
    const result = enzyme.mount(<TextArea error={"error label"} />);
    expect(result.find("span").text()).toEqual("error label");
  });
});
