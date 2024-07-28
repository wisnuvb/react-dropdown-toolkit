import React from "react";

import { Meta, StoryFn } from "@storybook/react";
import Dropdown from "./Dropdown";
import { DropdownProps } from "./DropdownProps";

export default {
  title: "Form",
  component: Dropdown,
} as Meta;

const Template: StoryFn<DropdownProps> = (args) => <Dropdown {...args} />;

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option with icon", value: "2" },
  { label: "Long long option 3", value: "3" },
  { label: "Long long long option 4", value: "4" },
  { label: "Long long long long option 5", value: "5" },
  { label: "Long long long long long option 6", value: "6" },
];

export const Default = Template.bind({});
Default.args = {
  id: "dropdown",
  withSearch: true,
  multiple: false,
  outlined: true,
  label: "Label",
  portal: false,
  onSelectedChange: (selected) => console.log(selected),
  options,
};
