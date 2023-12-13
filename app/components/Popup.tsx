import { ColumnFilter } from "@tanstack/react-table";
import React, { SetStateAction, useState } from "react";

interface PopupProps {
  closePopup: () => void;
  setColumnFilters: React.Dispatch<SetStateAction<ColumnFilter[]>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  columnId: string;
  selectInput?: boolean;
}

const Popup = ({
  closePopup,
  setColumnFilters,
  setSubmitted,
  title,
  columnId,
  selectInput,
}: PopupProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const onFilterChange = async (columnId: string, value: string) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== columnId)
        .concat({
          id: columnId,
          value,
        })
    );
    setSubmitted(true);
    setLoading(false);
    closePopup();
  };

  return (
    <div className="absolute top-8 bg-white p-4 rounded border border-[#DEDFE2] flex flex-col w-[250px]">
      <h4 className="text-primary-black font-medium">Filter by {title}</h4>
      <div className="flex w-full items-center gap-2 my-4">
        <p className="text-[14px] leading-[17.5px] text-primary-gray flex-shrink-0">
          is equal to
        </p>
        {selectInput ? (
          <select
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 rounded border border-primary-border text-sm leading-[17.5px] placeholder-[#9BA0A4] text-[#6A7383] outline-none h-[34px] w-full"
          >
            <option value="" defaultValue={"Select"}>
              Select
            </option>
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
            <option value="Complete">Complete</option>
          </select>
        ) : (
          <input
            type="text"
            className="px-2 rounded border border-primary-border text-sm leading-[17.5px] placeholder-[#9BA0A4] text-[#6A7383] outline-none h-[34px] w-full"
            placeholder="Search for..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>
      <button
        disabled={!searchTerm.length || loading}
        className="p-2 text-sm leading-[17.5px] font-semibold text-white flex justify-center items-center rounded-lg bg-[#0066DF] disabled:opacity-60"
        onClick={() => onFilterChange(columnId, searchTerm)}
      >
        {loading ? (
          <svg
            className="rotating-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
          >
            <path
              d="M15 8C15 6.51664 14.5601 5.06659 13.736 3.83322C12.9119 2.59985 11.7406 1.63856 10.3701 1.0709C8.99968 0.503246 7.49168 0.354721 6.03682 0.64411C4.58196 0.9335 3.24559 1.64781 2.1967 2.6967C1.14781 3.74559 0.4335 5.08196 0.14411 6.53682C-0.145279 7.99168 0.00324627 9.49968 0.570904 10.8701C1.13856 12.2406 2.09985 13.4119 3.33322 14.236C4.56659 15.0601 6.01664 15.5 7.5 15.5V14.0869C6.29612 14.0869 5.11927 13.7299 4.11828 13.0611C3.11729 12.3923 2.33711 11.4416 1.8764 10.3294C1.4157 9.21713 1.29515 7.99325 1.53002 6.8125C1.76489 5.63175 2.34461 4.54716 3.19588 3.69588C4.04716 2.84461 5.13175 2.26489 6.3125 2.03002C7.49325 1.79515 8.71713 1.9157 9.82937 2.3764C10.9416 2.83711 11.8923 3.61729 12.5611 4.61828C13.2299 5.61927 13.5869 6.79612 13.5869 8H15Z"
              fill="white"
            />
          </svg>
        ) : (
          "Apply"
        )}
      </button>
    </div>
  );
};

export default Popup;
