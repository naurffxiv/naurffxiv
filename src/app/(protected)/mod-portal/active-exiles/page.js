"use client";

import { ModPortalDataGrid } from "@/components/ModPortal/ModPortalDataGrid/ModPortalDataGrid";
import { makeData } from "@/components/ModPortal/makeData";

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
 * Mod Portal page for Active Exiles
 * */
export default function ModPortalActiveExiles() {
  return (
    <div>
      <ModPortalDataGrid columns={columns} rows={testData} />
    </div>
  );
}
