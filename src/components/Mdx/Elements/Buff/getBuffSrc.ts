/**
 * Construct an XIVAPI icon URI from the passed icon id
 * */
export function getBuffSrc(icon: number): string {
  // Append leading zeroes to the icon id so that it is always 6 digits
  const iconStr = String(icon);
  const fill = 6 - iconStr.length;
  const safeIconStr = "0".repeat(fill) + iconStr;

  // Icon series seems to be the first 3 digits of the 6 digit ID
  const iconseries = safeIconStr.substring(0, 3) + "0".repeat(3);

  return `https://xivapi.com/i/${iconseries}/${safeIconStr}.png`;
}
