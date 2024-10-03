"use client";

import IconButton from "@/components/shared/icon-button";
import SvgIcon from "@/components/shared/svg-icon";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";

export default function Search() {
  const searchRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentQuery = searchParams.get("query") || "";

  const handleQueryChange = () => {
    const query = searchRef.current?.value || "";

    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    if (searchRef.current) searchRef.current.value = "";

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search"
        ref={searchRef}
        defaultValue={currentQuery}
        className="w-full border-b border-b-dark-gray pb-3 text-body-medium placeholder:text-body-medium placeholder:text-dark-gray focus:outline-transparent"
      />
      <IconButton
        onClick={handleQueryChange}
        className="absolute bottom-3 right-0"
      >
        <SvgIcon id="search" className="text-black" />
      </IconButton>
    </div>
  );
}
