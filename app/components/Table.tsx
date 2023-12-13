"use client";
import {
  ColumnDef,
  ColumnFilter,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import Filters from "./Filters";

const itemsPerPage = 10;

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
}

const Table = <T extends object>({ data, columns }: ReactTableProps<T>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
  });

  const getColumnStyle = (columnId: string) => {
    const fixedWidths: Record<string, string> = {
      id: " md:w-[125px]",
      progress: "md:w-[125px]",
      item: "md:w-[400px] lg:w-[600px]",
      created_at: "md:w-[400px] lg:w-[600px]",
    };

    return fixedWidths[columnId];
  };

  const currentPage = table.getState().pagination.pageIndex + 1;
  const startRange = (currentPage - 1) * itemsPerPage + 1;
  const endRange = Math.min(
    currentPage * itemsPerPage,
    table.getFilteredRowModel().rows.length
  );

  return (
    <>
      <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
      {table.getFilteredRowModel().rows.length === 0 ? (
        <h3 className="my-5 text-2xl text-center">No results</h3>
      ) : (
        <>
          <table className="mt-4 w-full border-t border-[#D9DEE3] table-fixed md:table-auto">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-primary-border"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`py-2 px-[6px] ${getColumnStyle(header.id)}`}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="text-left text-[12px] text-primary-black font-semibold">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-[#ECEEF1]">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`py-2 px-[6px] text-[14px] text-primary-gray ${
                        cell.id === "progress"
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center py-[10px] px-[6px]">
            <p className="text-[12px] font-medium text-primary-gray">
              Viewing {startRange}/{endRange} of{" "}
              {table.getFilteredRowModel().rows.length} results
            </p>
            <div className="flex gap-1">
              <button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                className="px-2 py-[6px] rounded-md border border-primary-border text-[12px] font-semibold leading-4 text-primary-black disabled:text-primary-border"
              >
                Previous
              </button>
              <button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                className="px-2 py-[6px] rounded-md border border-primary-border text-[12px] font-semibold leading-4 text-primary-black disabled:text-primary-border"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Table;
