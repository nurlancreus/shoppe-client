"use client";

import { useSearchParams, useRouter } from "next/navigation";
import SvgIcon from "./svg-icon";

type PaginationProps = {
  totalPages: number;
};

export default function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const pageList = [];

  if (currentPage - 3 <= 1) {
    for (let i = 1; i <= 7; i++) pageList.push(i);
  } else if (currentPage + 3 >= totalPages) {
    for (let i = totalPages - 6; i <= totalPages; i++) pageList.push(i);
  } else {
    for (let i = currentPage - 3; i <= currentPage + 3; i++) pageList.push(i);
  }

  return (
    <div className="flex items-center gap-2">
      {!(currentPage == 1) && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="grid size-10 place-items-center rounded border border-dark-gray"
        >
          <SvgIcon id="caret" className="rotate-90" />
        </button>
      )}

      {pageList.map((pageNum) => {
        return (
          <button
            key={pageNum}
            className={`grid size-10 place-items-center rounded ${pageNum == currentPage ? "bg-black text-white" : "bg-white text-black"}`}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      {!(currentPage == totalPages) && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="grid size-10 place-items-center rounded border border-dark-gray"
        >
          <SvgIcon id="caret" className="-rotate-90" />
        </button>
      )}
    </div>
  );
}
