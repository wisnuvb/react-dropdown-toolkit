import React, { useState, useEffect, useRef } from "react";

import { DropdownProps } from "./DropdownProps";
import { cn } from "../utils";
import { CloseIcon, SearchIcon } from "../icons";
import PortalWrapper from "../PortalWrapper";

const Dropdown: React.FC<DropdownProps> = ({
  options,
  multiple = false,
  withSearch = true,
  portal = false,
  outlined = false,
  customRenderOption,
  zIndex = 1000,
  label = "Label",
  onSelectedChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputSearchRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen && withSearch) {
      setSearchTerm("");
      if (inputSearchRef.current) {
        inputSearchRef.current.focus();
      }
    }
  };

  const handleOptionClick = (value: string) => {
    if (multiple) {
      const isExist = selectedOptions.includes(value);
      const newOptions = !isExist
        ? [...selectedOptions, value]
        : selectedOptions;
      setSelectedOptions(newOptions);
      onSelectedChange?.(newOptions);
    } else {
      setSelectedOptions([value]);
      onSelectedChange?.([value]);
      setIsOpen(false);
    }
  };

  const handleRemoveOption = (value: string) => {
    const newSelectedOptions = selectedOptions.filter((item) => item !== value);
    onSelectedChange?.(newSelectedOptions);
    setSelectedOptions(newSelectedOptions);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="bg-[#61c9c7]">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const renderOption = (option: { label: string; value: string }) =>
    customRenderOption
      ? customRenderOption(option)
      : highlightText(option.label, searchTerm);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownMenu = (
    <div
      data-testid="dropdown-menu"
      className={cn(
        "absolute mt-2 left-0 w-full bg-white border border-[#e4e6e6] shadow max-h-64 overflow-y-auto"
      )}
      style={{ zIndex }}
    >
      {withSearch && (
        <div className="relative">
          <input
            type="text"
            className="w-full pl-10 pr-2 py-2 border-b border-[#e4e6e6] focus-visible:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputSearchRef}
          />
          <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 w-4 h-4" />
          {searchTerm && (
            <CloseIcon
              data-testid="clear-search"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 w-4 h-4 cursor-pointer"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
      )}
      <div className="max-h-60 overflow-y-auto">
        {filteredOptions?.length > 0 ? (
          filteredOptions.map((option) => (
            <div
              key={option.value}
              className={cn(
                "px-4 py-3 cursor-pointer hover:bg-[#f1fbf8]",
                multiple &&
                  selectedOptions.includes(option.value) &&
                  "bg-[#f1fbf8]"
              )}
              onClick={() => handleOptionClick(option.value)}
            >
              {renderOption(option)}
            </div>
          ))
        ) : (
          <p className="px-4 py-3 text-[#7c7e7e]">No options</p>
        )}
      </div>
    </div>
  );

  return (
    <PortalWrapper portal={portal}>
      <div
        className="relative flex items-center gap-4 w-full"
        style={{ zIndex }}
        ref={dropdownRef}
      >
        <label className="basis-full sm:basis-2/12" htmlFor="rdt-dropdown">
          {label}
        </label>
        <div className="relative w-full">
          <div
            data-testid="dropdown"
            className={cn(
              "p-2 min-h-10 cursor-pointer rounded w-full relative",
              outlined ? "border border-[#d9d9d9] bg-white" : "bg-[#d7d9da]"
            )}
            onClick={toggleDropdown}
          >
            {multiple ? (
              <div className="flex flex-wrap gap-1">
                {selectedOptions.map((value) => (
                  <div
                    key={value}
                    className={
                      "flex items-center gap-2 bg-[#f4f5f5] text-[#656767] pl-3 pr-4 py-1 rounded-full"
                    }
                  >
                    {options.find((option) => option.value === value)?.label}
                    <button
                      data-testid="remove-option"
                      className="ml-1 text-[#656767]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveOption(value);
                      }}
                    >
                      <CloseIcon className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              options.find((option) => option.value === selectedOptions[0])
                ?.label || "Select..."
            )}
          </div>
          {isOpen && dropdownMenu}
        </div>
      </div>
    </PortalWrapper>
  );
};

export default Dropdown;
