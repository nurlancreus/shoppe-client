"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import Image from "next/image";
import ProductActions from "./product-actions"; // Correct import for ProductActions
import { Button } from "../../_components/ui/button";
import { Input } from "../../_components/ui/input";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../../_components/ui/table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../../_components/ui/dropdown-menu";
import { ProductImageDTOType } from "@/types";

// Sample product data
const products = [
  {
    id: "P001",
    name: "Product 1",
    description: "Description of Product 1",
    price: 250.0,
    stock: 10,
    weight: 1.5,
    height: 10.0,
    width: 5.0,
    material: "Plastic",
    colors: ["Red", "Blue"],
    categories: [{ id: "C001", name: "Category 1" }],
    productImages: [
      {
        fileName: "product1-main.jpg",
        pathName: "https://via.placeholder.com/600x400?text=Main+Image",
        isMain: true,
      },
      {
        fileName: "product1-secondary.jpg",
        pathName: "/img2.jpg",
        isMain: false,
      },
    ],
    rating: 4.5,
    createdAt: new Date(),
  },
  // Add more products as needed
];

// Define the columns for the product table
const columns: ColumnDef<typeof products[number]>[] = [
  {
    accessorKey: "name",
    header: () => <div>Product Name</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => `$${(row.getValue("price") as number).toFixed(2)}`,
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }) => `${row.getValue("weight")} kg`,
  },
  {
    accessorKey: "height",
    header: "Height",
    cell: ({ row }) => `${row.getValue("height")} cm`,
  },
  {
    accessorKey: "width",
    header: "Width",
    cell: ({ row }) => `${row.getValue("width")} cm`,
  },
  {
    accessorKey: "material",
    header: "Material",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (row.getValue("rating") as number).toFixed(1),
  },
  {
    accessorKey: "productImages",
    header: "Main Image",
    cell: ({ row }) => {
      const mainImage = (row.getValue("productImages") as ProductImageDTOType[]).find((img) => img.isMain);
      return mainImage ? (
        <Image
          src={mainImage.pathName}
          alt={mainImage.fileName}
          width={50}
          height={50}
          className="object-cover"
        />
      ) : (
        "No Image"
      );
    },
  },
  {
    id: "actions", // Actions column to use ProductActions
    cell: ({ row }) => <ProductActions id={row.original.id} />, // Pass product ID to ProductActions
  },
];

export default function ProductTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by product name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
