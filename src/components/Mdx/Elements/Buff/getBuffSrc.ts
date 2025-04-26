export function getBuffSrc(icon: number): string {
  const iconStr = String(icon);
  const fill = 6 - iconStr.length;
  const safeIconStr = "0".repeat(fill) + iconStr;
  const iconseries = safeIconStr.substring(0, 3) + "0".repeat(3);

  return `https://xivapi.com/i/${iconseries}/${safeIconStr}.png`;
}
