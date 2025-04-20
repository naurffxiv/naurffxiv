"use client";

import { ModPortalDataGrid } from "@/components/ModPortal/ModPortalDataGrid/ModPortalDataGrid";
import { makeData } from "@/components/ModPortal/makeData";

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
 * Mod Portal page for Strikes
 * */
export default function ModPortalStrikes() {
  return (
    <div>
      <ModPortalDataGrid columns={columns} rows={testData} />
    </div>
  );
}
