import React, { SetStateAction } from "react";
import FilterItem from "./FilterItem";
import { ColumnFilter } from "@tanstack/react-table";
interface FilterProps {
  columnFilters: ColumnFilter[];
  setColumnFilters: React.Dispatch<SetStateAction<ColumnFilter[]>>;
}
const Filters = ({ columnFilters, setColumnFilters }: FilterProps) => {
  return (
    <div className="flex gap-5">
      <FilterItem
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        title="Request ID"
        columnId="id"
        key={0}
      />
      <FilterItem
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        title="Progress"
        columnId="progress"
        key={1}
        selectInput={true}
      />
      <FilterItem
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        title="Item"
        columnId="item"
        key={2}
      />
    </div>
  );
};

export default Filters;
