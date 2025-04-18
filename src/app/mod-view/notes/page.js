"use client";

import { ModViewDataGrid } from "@/components/ModView/ModViewDataGrid/ModViewDataGrid";
import { makeData } from "@/components/ModView/makeData";

const testData = makeData(100, ["userId", "issuedBy", "lastEdited", "notes"]);

const columns = [
  { headerName: "User ID", field: "userId", width: 100 },
  { headerName: "Issued by", field: "issuedBy", width: 120 },
  { headerName: "Last Edited", field: "lastEdited", width: 150 },
  { headerName: "Notes Summary", field: "notes", flex: 1 },
];

/**
 * Mod View page for Notes
 * */
export default function ModViewNotes(props) {
  return (
    <div>
      <ModViewDataGrid columns={columns} rows={testData} />
    </div>
  );
}
