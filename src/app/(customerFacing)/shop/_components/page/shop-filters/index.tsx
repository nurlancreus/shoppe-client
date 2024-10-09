import Select from "@/components/ui/select";
import Search from "../../../../../../components/ui/search";
import ToggleSwitch from "@/components/ui/toggle-switch";

const shopByOptions = [
  { value: "category1", label: "Category 1" },
  { value: "category2", label: "Category 2" },
  { value: "category3", label: "Category 3" },
];

const sortByOptions = [
  { value: "price", label: "Price" },
  { value: "popularity", label: "Popularity" },
  { value: "rating", label: "Rating" },
];

export default function ShopFilters() {
  return (
    <aside className="flex flex-col gap-10">
      <Search />
      <div className="flex flex-col gap-4">
        <Select
          key="shopBy"
          defaultText="ShopBy"
          options={shopByOptions}
          paramKey="shopBy"
        />
        <Select
          key="sortBy"
          defaultText="SortBy"
          options={sortByOptions}
          paramKey="sortBy"
        />
      </div>
      <ToggleSwitch key="onSale" label="On sale" paramKey="onSale" />
      <ToggleSwitch key="onSort" label="On sort" paramKey="onSort" />
    </aside>
  );
}
