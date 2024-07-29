export interface DropdownProps {
  id?: string;
  options: Array<{ label: string; value: string }>;
  multiple?: boolean;
  withSearch?: boolean;
  outlined?: boolean;
  portal?: boolean;
  customRenderOption?: (option: { label: string; value: string }) => JSX.Element;
  zIndex?: number;
  label?: string;
  placeholder?: string;
  noLabel?: boolean;
  labelPosition?: 'top' | 'left';
  labelWidth?: string;
  labelStyle?: React.CSSProperties;
  onSelectedChange?: (selected: string[]) => void;
}
