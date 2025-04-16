"use client";

import { ModViewDataGrid } from "@/components/ModView/ModViewDataGrid/ModViewDataGrid";
import { makeData } from "@/components/ModView/makeData";

const testData = makeData(100, ["userId", "created", "status", "banReason"]);

const columns = [
  { headerName: "Discord ID", field: "userId", width: 120 },
  { headerName: "Created", field: "created", width: 150 },
  { headerName: "Status", field: "status", width: 100, renderCell: StatusCell },
  { headerName: "Ban Reason", field: "banReason", flex: 1 },
];

/**
 * Mod View page for Unban Appeals
 * */
export default function ModViewUnbanAppeals(props) {
  return (
    <div>
      <ModViewDataGrid columns={columns} rows={testData} />
    </div>
  );
}

/**
 * Custom rendered cell to show the status colors
 * */
function StatusCell({ field, row }) {
  const color = {
    Pending: "#ffb200",
    Approved: "#13fd98",
    Rejected: "#ff5151",
  }[row[field]];

  return <div style={{ color }}>{row[field]}</div>;
}
