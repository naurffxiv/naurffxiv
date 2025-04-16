"use client";

import { ModViewDataGrid } from "@/components/ModView/ModViewDataGrid/ModViewDataGrid";
import { makeData } from "@/components/ModView/makeData";

const testData = makeData(100, [
  "userId",
  "issuedBy",
  "created",
  "severity",
  "strikeSummary",
]);

const columns = [
  { headerName: "User ID", field: "userId", width: 100 },
  { headerName: "Issued by", field: "issuedBy", width: 120 },
  { headerName: "Created", field: "created", width: 150 },
  { headerName: "Severity", field: "severity", width: 120 },
  { headerName: "Strike Summary", field: "strikeSummary", flex: 1 },
];

/**
 * Mod View page for Strikes
 * */
export default function ModViewStrikes(props) {
  return (
    <div>
      <ModViewDataGrid columns={columns} rows={testData} />
    </div>
  );
}
