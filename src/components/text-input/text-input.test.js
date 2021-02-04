import React from "react";
import enzyme from "../../../config/enzyme";
import TextInput from "./index";

describe("<TextInput />", () => {
  test("TextInput changes value", () => {
    const result = enzyme.mount(<TextInput />);
    result.find("input").simulate("change", { target: { value: "new value" } });
    expect(result.find("input").getDOMNode().value).toEqual("new value");
  });

  test("TextInput sets default value", () => {
    const result = enzyme.mount(<TextInput defaultValue={"default value"} />);
    expect(result.find("input").getDOMNode().value).toEqual("default value");
  });

  test("TextInput renders error label in <span>", () => {
    const result = enzyme.mount(<TextInput error={"error label"} />);
    expect(result.find("span").text()).toEqual("error label");
  });
});
