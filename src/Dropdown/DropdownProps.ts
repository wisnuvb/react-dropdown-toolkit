// src/components/Dropdown/DropdownProps.ts
export interface DropdownProps {
  id?: string;
  options: Array<{ label: string; value: string }>;
  multiple?: boolean;
  withSearch?: boolean;
  outlined?: boolean;
  portal?: boolean;
  customRenderOption?: (option: {
    label: string;
    value: string;
  }) => JSX.Element;
  zIndex?: number;
  label?: string;
  onSelectedChange?: (selected: string[]) => void;
}
