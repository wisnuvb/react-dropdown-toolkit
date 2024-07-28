import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dropdown from "./Dropdown";

const customRenderOption = (option: { label: string; value: string }) => (
  <div data-testid={`custom-option-${option.value}`} className="custom-option">
    {option.label} (Custom)
  </div>
);

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

describe("Dropdown Component", () => {
  test("renders dropdown and toggles open/close", () => {
    render(<Dropdown options={options} />);
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Select..."));
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  test("search functionality works", async () => {
    render(<Dropdown options={options} withSearch />);

    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
    fireEvent.click(dropdown);

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: "Option 1" } });

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 3")).not.toBeInTheDocument();
  });

  test("selects single option correctly", async () => {
    render(<Dropdown options={options} />);
    fireEvent.click(screen.getByText("Select..."));
    fireEvent.click(screen.getByText("Option 1"));
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  test("supports multiple selection and removal", async () => {
    render(<Dropdown options={options} multiple />);

    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
    fireEvent.click(dropdown);

    fireEvent.click(screen.getByText("Option 1"));
    fireEvent.click(screen.getByText("Option 2"));

    const removeButtons = screen.queryAllByTestId("remove-option");
    fireEvent.click(removeButtons[0]);

    expect(screen.queryByText("Option 1")).toBeInTheDocument();
  });

  test("toggles dropdown visibility on click and handles search term", () => {
    render(
      <Dropdown
        options={options}
        withSearch={true}
        multiple={false}
        portal={false}
      />
    );

    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
    fireEvent.click(dropdown);

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: "Option 1" } });

    fireEvent.click(dropdown);
    expect(searchInput).toHaveValue("Option 1");
  });

  test("closes dropdown when clicking outside of it", () => {
    render(
      <Dropdown
        options={options}
        withSearch={false}
        multiple={false}
        portal={false}
      />
    );

    const dropdown = screen.getByTestId("dropdown");
    fireEvent.click(dropdown);

    const dropdownMenu = screen.getByTestId("dropdown-menu");
    expect(dropdownMenu).toBeVisible();

    fireEvent.mouseDown(document.body);
    expect(dropdownMenu).not.toBeVisible();
  });

  test("clears search term", () => {
    render(<Dropdown options={options} withSearch />);

    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
    fireEvent.click(dropdown);

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: "Option 1" } });

    const clearSearch = screen.getByTestId("clear-search");
    fireEvent.click(clearSearch);

    expect(searchInput).toHaveValue("");

    fireEvent.change(searchInput, { target: { value: "Not found!" } });
    expect(screen.getByText("No options")).toBeInTheDocument();
  });

  test("update outlined style", () => {
    render(<Dropdown options={options} outlined />);
    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown.className).toContain("border");
  });

  test("should render custom options when customRenderOption is provided", () => {
    render(
      <Dropdown options={options} customRenderOption={customRenderOption} />
    );

    fireEvent.click(screen.getByTestId("dropdown"));

    expect(screen.getByTestId("custom-option-1")).toBeInTheDocument();
    expect(screen.getByTestId("custom-option-2")).toBeInTheDocument();
  });

  test("should render default options when customRenderOption is not provided", () => {
    render(<Dropdown options={options} />);

    fireEvent.click(screen.getByTestId("dropdown"));

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });
});
