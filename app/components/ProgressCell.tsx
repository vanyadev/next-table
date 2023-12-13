import Image from "next/image";
import React from "react";

export interface ProgressCellProps {
  progress: "Draft" | "Complete" | "Pending";
}

const ProgressCell = ({ progress }: ProgressCellProps) => {
  const { cn, icon } =
    {
      Draft: { cn: "", icon: "./draft.svg" },
      Complete: { cn: "complete", icon: "./complete.svg" },
      Pending: { cn: "pending", icon: "./progress.svg" },
    }[progress] || "";
  return (
    <div className={`progress-cell ${cn}`}>
      {progress}
      <Image
        src={icon}
        alt="icon"
        className="h-auto w-auto"
        width={14}
        height={14}
      />
    </div>
  );
};

export default ProgressCell;
