"use client";

import SvgIcon from "@/components/shared/svg-icon";

type SelectProps = {
  options: {
    value: string;
    label: string;
  }[];
  id: string;
  label?: string;
  defaultText?: string;
  value?: string;
  error?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
};

export default function Select({
  options,
  id,
  label,
  value,
  onChange,
  error,
  defaultText = "Select an option",
}: SelectProps) {
  return (
    <div>
      <div className="relative border-b border-b-dark-gray">
        {label && <label htmlFor={id}>{label}</label>}
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="block w-full cursor-pointer appearance-none py-4 focus-visible:outline-transparent"
        >
          <option value="">{defaultText}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <SvgIcon
          id="caret"
          className="-z-1 pointer-events-none absolute bottom-6 right-3 top-6"
          width={14}
          height={7}
        />
      </div>
      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}{" "}
    </div>
  );
}
