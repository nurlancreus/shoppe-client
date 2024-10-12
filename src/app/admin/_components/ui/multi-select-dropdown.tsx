import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";

type MultiSelectDropdownProps = {
  options: string[];
  selectedValues: string[];
  onChange: (value: string) => void;
  label: string;
  error?: string;
};

export function MultiSelectDropdown({
  options,
  selectedValues,
  onChange,
  label,
  error
}: MultiSelectDropdownProps) {
  return (
    <div className="space-y-2">
      <label>{label}</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            {selectedValues.length
              ? selectedValues.join(", ")
              : `Select ${label}`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option}
              checked={selectedValues.includes(option)}
              onCheckedChange={() => onChange(option)}
            >
              {option}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {error && <div className="text-destructive">{error}</div>}
    </div>
  );
}
