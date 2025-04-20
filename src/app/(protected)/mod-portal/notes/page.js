"use client";

import { ModPortalDataGrid } from "@/components/ModPortal/ModPortalDataGrid/ModPortalDataGrid";
import { makeData } from "@/components/ModPortal/makeData";

const testData = makeData(100, ["userId", "issuedBy", "lastEdited", "notes"]);

const columns = [
  { headerName: "User ID", field: "userId", width: 100 },
  { headerName: "Issued by", field: "issuedBy", width: 120 },
  { headerName: "Last Edited", field: "lastEdited", width: 150 },
  { headerName: "Notes Summary", field: "notes", flex: 1 },
];

/**
 * Mod Portal page for Notes
 * */
export default function ModPortalNotes() {
  return (
    <div>
      <ModPortalDataGrid columns={columns} rows={testData} />
    </div>
  );
}
