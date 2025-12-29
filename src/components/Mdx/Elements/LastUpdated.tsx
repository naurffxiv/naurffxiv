"use client";

interface LastUpdatedProps {
  lastUpdated: string | null | undefined;
}

/**
 * LastUpdated component displays when a page was last modified
 * @param lastUpdated - ISO string of the date when the file was last modified
 */
export default function LastUpdated({ lastUpdated }: LastUpdatedProps) {
  if (!lastUpdated) {
    return null;
  }

  // Parse ISO string to Date object
  const lastUpdatedDate = new Date(lastUpdated);

  // Validate date
  if (isNaN(lastUpdatedDate.getTime())) {
    return null;
  }

  const formatDate = (date: Date): string => {
    // Format: "December 15, 2024 at 3:45 PM"
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York", // EST/EDT timezone
    }).format(date);
  };

  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);

    // Calculate months based on days (approximately 30.44 days per month)
    // Use rounding for more accurate month representation
    const diffMonths = Math.round(diffDays / 30.44);
    const diffYears = Math.round(diffDays / 365.25);

    if (diffSeconds < 60) return "just now";
    if (diffMinutes < 60)
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    if (diffWeeks < 4)
      return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""} ago`;
    if (diffMonths < 12)
      return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
    return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
  };

  const fullDate = formatDate(lastUpdatedDate);
  const relativeTime = formatRelativeTime(lastUpdatedDate);

  return (
    <div className="mt-2 mb-4 text-sm text-gray-400">
      <span className="font-medium">Last updated:</span>{" "}
      <time dateTime={lastUpdated} title={fullDate}>
        {relativeTime}
      </time>
      <span className="hidden sm:inline"> ({fullDate})</span>
    </div>
  );
}
