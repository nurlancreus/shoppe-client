"use client";

import IconButton from "@/components/shared/icon-button";
import SvgIcon from "@/components/shared/svg-icon";

export default function Search() {
  return (
    <IconButton onClick={() => console.log("search")}>
      <SvgIcon id="search" />
    </IconButton>
  );
}
