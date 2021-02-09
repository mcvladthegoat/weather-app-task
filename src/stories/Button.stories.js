import React from "react";

import { Btn } from "../components";

const Story = {
  title: "Example/Button",
  component: Btn,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export default Story;

const Template = (args) => <Btn {...args} />;

export const Blue = Template.bind({});
Blue.args = {
  colorScheme: "blue",
  label: "Blue Button",
};

export const Red = Template.bind({});
Red.args = {
  colorScheme: "blue",
  label: "Red Button",
};

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Button",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Button",
// };
