"use client";

import { ReactNode } from "react";
import { ModPortalDataGrid } from "@/components/ModPortal/ModPortalDataGrid/ModPortalDataGrid";
import { makeData } from "@/components/ModPortal/makeData";

const testData = makeData(100, ["userId", "created", "status", "banReason"]);

const columns = [
  { headerName: "Discord ID", field: "userId", width: 120 },
  { headerName: "Created", field: "created", width: 150 },
  { headerName: "Status", field: "status", width: 100, renderCell: StatusCell },
  { headerName: "Ban Reason", field: "banReason", flex: 1 },
];

/**
 * Mod Portal page for Unban Appeals
 * */
export default function ModPortalUnbanAppeals(): ReactNode {
  return (
    <div>
      <ModPortalDataGrid columns={columns} rows={testData} />
    </div>
  );
}

/**
 * Custom rendered cell to show the status colors
 * */
function StatusCell({ field, row }: StatusCellProps): ReactNode {
  const color = STATUS_COLORS[row[field]];

  return <div style={{ color }}>{row[field]}</div>;
}

type StatusCellProps<T extends object = object> = {
  row: T;
  field: keyof T;
};

const STATUS_COLORS = {
  Pending: "#ffb200",
  Approved: "#13fd98",
  Rejected: "#ff5151",
};
