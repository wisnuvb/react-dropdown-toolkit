declare module 'react-dropdown-toolkit' {
  import * as React from 'react';

  export interface DropdownProps {
    options: Array<{ label: string; value: string }>;
    multiple?: boolean;
    withSearch?: boolean;
    portal?: boolean;
    outlined?: boolean;
    customRenderOption?: (option: { label: string; value: string }) => React.ReactNode;
    zIndex?: number;
    label?: string;
  }

  const Dropdown: React.FC<DropdownProps>;

  export default Dropdown;
}
