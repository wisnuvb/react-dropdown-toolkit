import React, { useState, useEffect, useRef } from 'react';

import { DropdownProps } from './DropdownProps';
import { cn } from '../utils';
import { CloseIcon, SearchIcon } from '../icons';
import PortalWrapper from '../PortalWrapper';

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  multiple = false,
  withSearch = true,
  portal = false,
  outlined = true,
  customRenderOption,
  zIndex = 1000,
  label = 'Label',
  noLabel = false,
  labelPosition = 'left',
  labelWidth = '100px',
  onSelectedChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputSearchRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen && withSearch) {
      setSearchTerm('');
      if (inputSearchRef.current) {
        inputSearchRef.current.focus();
      }
    }
  };

  const handleOptionClick = (value: string) => {
    if (multiple) {
      const isExist = selectedOptions.includes(value);
      const newOptions = !isExist ? [...selectedOptions, value] : selectedOptions;
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
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="rdt-bg-[#61c9c7]">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const renderOption = (option: { label: string; value: string }) =>
    customRenderOption ? customRenderOption(option) : highlightText(option.label, searchTerm);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownMenu = (
    <div
      data-testid="dropdown-menu"
      className="rdt-absolute rdt-mt-2 rdt-left-0 rdt-w-full rdt-bg-white rdt-border rdt-border-[#e4e6e6] rdt-text-[#3e4242] rdt-text-base rdt-shadow rdt-max-h-64 rdt-overflow-y-auto"
      style={{ zIndex }}
    >
      {withSearch && (
        <div className="rdt-relative">
          <input
            type="text"
            className="rdt-w-full rdt-pl-10 rdt-pr-2 rdt-py-2 rdt-border-b rdt-border-[#e4e6e6] focus-visible:rdt-outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputSearchRef}
          />
          <SearchIcon className="rdt-absolute rdt-top-1/2 rdt-left-3 rdt-transform -rdt-translate-y-1/2 rdt-w-4 rdt-h-4" />
          {searchTerm && (
            <CloseIcon
              data-testid="clear-search"
              className="rdt-absolute rdt-top-1/2 rdt-right-3 rdt-transform -rdt-translate-y-1/2 rdt-w-4 rdt-h-4 rdt-cursor-pointer"
              onClick={() => setSearchTerm('')}
            />
          )}
        </div>
      )}
      <div className="rdt-max-h-60 rdt-overflow-y-auto">
        {filteredOptions?.length > 0 ? (
          filteredOptions.map((option) => (
            <div
              key={option.value}
              className={cn(
                'rdt-px-4 rdt-py-3 rdt-cursor-pointer hover:rdt-bg-[#f1fbf8] rdt-text-base',
                multiple && selectedOptions.includes(option.value) && 'rdt-bg-[#f1fbf8]'
              )}
              onClick={() => handleOptionClick(option.value)}
            >
              {renderOption(option)}
            </div>
          ))
        ) : (
          <p className="rdt-px-4 rdt-py-3 rdt-text-[#7c7e7e]">No options</p>
        )}
      </div>
    </div>
  );

  return (
    <PortalWrapper portal={portal}>
      <div
        className={cn(
          'rdt-relative rdt-flex rdt-w-full',
          labelPosition === 'top' ? 'rdt-flex-col rdt-items-start rdt-gap-2' : 'rdt-flex-row rdt-items-center rdt-gap-4'
        )}
        style={{ zIndex }}
        ref={dropdownRef}
      >
        {!noLabel && (
          <label
            style={{ width: noLabel ? '100%' : labelWidth ? labelWidth : '250px' }}
            className="rdt-text-base rdt-text-gray-600 rdt-font-medium"
          >
            {label}
          </label>
        )}
        <div className="rdt-relative rdt-w-full">
          <div
            data-testid="dropdown"
            className={cn(
              'rdt-p-2 rdt-min-h-[50px] rdt-flex rdt-items-center rdt-cursor-pointer rdt-rounded rdt-w-full rdt-relative',
              outlined ? 'rdt-border rdt-border-[#d9d9d9] rdt-bg-white' : 'rdt-bg-[#d7d9da]'
            )}
            onClick={toggleDropdown}
          >
            {multiple ? (
              <div className="rdt-flex rdt-flex-wrap rdt-gap-1">
                {selectedOptions.map((value) => (
                  <p
                    key={value}
                    className={
                      'rdt-flex rdt-items-center rdt-gap-2 rdt-bg-[#f4f5f5] rdt-text-base rdt-text-[#656767] rdt-pl-3 rdt-pr-4 rdt-py-1 rdt-rounded-full'
                    }
                  >
                    {options.find((option) => option.value === value)?.label}
                    <button
                      data-testid="remove-option"
                      className="rdt-ml-1 rdt-text-[#656767]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveOption(value);
                      }}
                    >
                      <CloseIcon className="rdt-w-4 rdt-h-4 rdt-text-gray-600" />
                    </button>
                  </p>
                ))}
              </div>
            ) : (
              options.find((option) => option.value === selectedOptions[0])?.label || 'Select...'
            )}
          </div>
          {isOpen && dropdownMenu}
        </div>
      </div>
    </PortalWrapper>
  );
};

export default Dropdown;
