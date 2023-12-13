"use client";
import Image from "next/image";
import React, { SetStateAction, useRef, useState } from "react";
import Popup from "./Popup";
import { ColumnFilter } from "@tanstack/react-table";
import { useOnClickOutside } from "usehooks-ts";

interface FilterProps {
  columnFilters: ColumnFilter[];
  setColumnFilters: React.Dispatch<SetStateAction<ColumnFilter[]>>;
  title: string;
  columnId: string;
  selectInput?: boolean;
}

const FilterItem: React.FC<FilterProps> = ({
  columnFilters,
  setColumnFilters,
  title,
  columnId,
  selectInput,
}: FilterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const filterTerm = columnFilters.find((f) => f.id === columnId);

  useOnClickOutside(ref, () => setIsOpen(false));

  const handleDeleteFilter = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (filterTerm) {
      const filterToDelete = columnFilters.filter(
        (filter) => filter.id !== filterTerm.id
      );
      setColumnFilters(filterToDelete);
      setSubmitted(false);
    }
  };

  return (
    <div className="flex items-center gap-[13px] relative" ref={ref}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`btn flex p-[5px] h-[22px] items-center gap-[5px] text-[12px] font-medium text-primary-gray rounded-full border ${
          submitted && filterTerm ? "border-solid" : "border-dashed"
        } border-[#C1C8D1]`}
      >
        <Image
          src={submitted ? "./close.svg" : "./plus.svg"}
          width={14}
          height={12}
          alt="plus"
          onClick={submitted ? handleDeleteFilter : undefined}
        />
        {title}
        {submitted && filterTerm && (
          <div className="pl-2 border-l text-[12px] font-medium text-[#007AFF] flex items-center gap-1">
            {filterTerm.value as string}
            <Image src="./arrow-down.svg" width={9} height={12} alt="arrow" />
          </div>
        )}
      </button>
      {isOpen && (
        <Popup
          closePopup={() => setIsOpen(false)}
          setColumnFilters={setColumnFilters}
          setSubmitted={setSubmitted}
          title={title}
          columnId={columnId}
          selectInput={selectInput}
        />
      )}
    </div>
  );
};

export default FilterItem;
