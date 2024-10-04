"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import SvgIcon from "../shared/svg-icon";

type SelectProps = {
  options: {
    value: string;
    label: string;
  }[];
  paramKey: string;
  label?: string;
  defaultText?: string;
  multiple?: boolean;
};

export default function Select({
  options,
  paramKey,
  label,
  defaultText = "Select an option",
  multiple = false,
}: SelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = multiple
    ? searchParams.getAll(paramKey)
    : searchParams.get(paramKey) || "";

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { options } = e.target;
    const params = new URLSearchParams(searchParams);

    if (multiple) {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      if (selectedValues.length) {
        params.delete(paramKey);
        selectedValues.forEach((value) => {
          params.append(paramKey, value);
        });
      } else {
        params.delete(paramKey);
      }
    } else {
      const value = e.target.value;
      if (value) {
        params.set(paramKey, value);
      } else {
        params.delete(paramKey);
      }
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative border border-light-gray">
      {label && <label htmlFor={paramKey}>{label}</label>}
      <select
        id={paramKey}
        value={currentValue}
        onChange={handleChange}
        className="block w-full cursor-pointer appearance-none px-3 py-4"
        multiple={multiple}
      >
        {!multiple && <option value="">{defaultText}</option>}
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
  );
}
