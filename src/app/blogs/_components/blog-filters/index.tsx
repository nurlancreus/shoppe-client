import Search from "@/components/ui/search";
import TabButton from "@/components/ui/tab-button";
import React from "react";

export default function BlogFilters() {
  return (
    <aside className="flex flex-col gap-10">
      <Search />
      <div className="flex flex-col gap-4">
        <h5 className="text-h4-desktop font-semibold">Categories</h5>
        <ul className="flex flex-col gap-[.625rem]">
          <li>
            <TabButton
              defaultValue="fashion"
              paramKey="category"
              value="fashion"
              text="Fashion"
              variant="category"
            />
          </li>
        </ul>
      </div>
    </aside>
  );
}
