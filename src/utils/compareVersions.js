// Parse a version string like "v1.2.3" into an array of numbers [1, 2, 3]
export function parseVersion(tag) {
  return tag
    .replace(/^v/, "") // Strip the "v" if it exists
    .split(".") // Split by dot
    .map(Number); // Convert each part to a number
}

// Compare two release objects based on their version numbers
// Returns >0 if b is newer, <0 if a is newer, 0 if equal
export function compareVersions(a, b) {
  const vA = parseVersion(a.tag_name);
  const vB = parseVersion(b.tag_name);

  const maxLength = Math.max(vA.length, vB.length);

  for (let i = 0; i < maxLength; i++) {
    const numA = vA[i] ?? 0; // Assume 0 if missing
    const numB = vB[i] ?? 0;

    if (numA !== numB) {
      return numB - numA;
    }
  }

  return 0; // Versions are the same
}
