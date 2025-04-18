const USERS = ["User A", "User B", "User C", "User D"];

const MODS = ["raven", "draven", "kraven", "maven"];

const DATES = [
  "2025-03-21 01:21:54",
  "2025-03-22 01:21:54",
  "2025-03-23 01:21:54",
  "2025-03-23 01:22:54",
];

const NOTES = [
  "very cool person something something",
  "smells funny",
  "greeds exaflares",
  "needs exaflares",
];

const NUMBERS = [1, 2, 3];

const STATUSI = ["Pending", "Approved", "Rejected"];

const CONST_MAP = {
  //----- Notes
  userId: USERS,
  issuedBy: MODS,
  lastEdited: DATES,
  notes: NOTES,
  //----- Strikes
  // userId: USERS,
  // issuedBy: MODS,
  created: DATES,
  severity: NUMBERS,
  strikeSummary: NOTES,
  //----- Active Exiles
  // userId: USERS,
  // issuedBy: MODS,
  startDate: DATES,
  endDate: DATES,
  exileSummary: NOTES,
  //----- Unban Appeals
  // userId: USERS,
  // created: DATES,
  status: STATUSI,
  banReason: NOTES,
};

export function makeData(count, keys) {
  return new Array(count).fill(null).map(makeItem(keys));
}

function makeItem(keys) {
  return (_, i) => ({
    id: i,
    ...keys.reduce((acc, k) => {
      const mockData = CONST_MAP[k];
      acc[k] = mockData[i % mockData.length];

      return acc;
    }, {}),
  });
}
