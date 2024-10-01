import SvgIcon from "@/components/shared/svg-icon";
import React from "react";

export default function Search() {
  return (
    <div className="relative w-1/3 group">
      <input
        type="text"
        placeholder="Give an email, get the newsletter."
        className="w-full border-b border-b-black pb-3 placeholder:text-h5-desktop placeholder:text-dark-gray focus:outline-transparent"
      />
      <button className="absolute right-0 bottom-3 opacity-0 -translate-x-16 transition duration-300 group-focus-within:opacity-100 group-focus-within:translate-x-0">
        <SvgIcon id="arrow" />
      </button>
    </div>
  );
}
