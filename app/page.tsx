"use client";

import { useMemo } from "react";
import mockData from "@/mock-data.json";
import Table from "./components/Table";
import ProgressCell from "./components/ProgressCell";
import { formatDateTime } from "@/helpers/formatDate";
import { ColumnDef } from "@tanstack/react-table";

export default function Home() {
  const data = useMemo(() => mockData, []);

  const cols = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        header: "Request ID",
        accessorKey: "id",
        filterFn: "includesString",
      },
      {
        header: "Progress",
        accessorKey: "progress",
        cell: (info: any) => <ProgressCell progress={info.getValue()} />,
      },
      {
        header: "Item",
        accessorKey: "item",
      },
      {
        header: "Created At",
        accessorKey: "created_at",
        cell: (info: any) => formatDateTime(info.getValue()),
      },
    ],
    []
  );

  return (
    <div className="p-4 sm:p-8">
      <Table data={data} columns={cols} />
    </div>
  );
}
