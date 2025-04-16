"use client";

import { ModViewDataGrid } from "@/components/ModView/ModViewDataGrid/ModViewDataGrid";
import { makeData } from "@/components/ModView/makeData";

const testData = makeData(100, [
  "userId",
  "issuedBy",
  "startDate",
  "endDate",
  "exileSummary",
]);

const columns = [
  { headerName: "User ID", field: "userId", width: 100 },
  { headerName: "Issued by", field: "issuedBy", width: 120 },
  { headerName: "Start Date", field: "startDate", width: 150 },
  { headerName: "End Date", field: "endDate", width: 150 },
  { headerName: "Exile Summary", field: "exileSummary", flex: 1 },
];

/**
 * Mod View page for Active Exiles
 * */
export default function ModViewActiveExiles(props) {
  return (
    <div>
      <ModViewDataGrid columns={columns} rows={testData} />
    </div>
  );
}
