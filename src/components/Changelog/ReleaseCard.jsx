"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { GH_REPO } from "@/utils";

export default function ReleaseCard({
  release,
  isExpanded,
  toggleRelease,
  isLatest,
}) {
  const [hovering, setHovering] = useState(false);

  if (!release?.version) return null;

  const date = release.date ? new Date(release.date) : null;

  const shortDate = date
    ? date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown date";

  const fullDate = date
    ? date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const handleToggle = () => {
    if (!isLatest) toggleRelease(release.version);
  };

  return (
    <div
      id={release.version}
      className="overflow-hidden border border-white rounded-lg"
    >
      {/* Header section */}
      <div
        className={`flex items-center justify-between p-6 ${
          isLatest ? "cursor-default" : "cursor-pointer"
        }`}
        onClick={handleToggle}
      >
        <div>
          {/* Release version and Latest badge */}
          <div className="flex items-center gap-3">
            <a
              href={`https://github.com${GH_REPO}/releases/tag/${release.version}`}
              target="_blank"
              rel="noreferrer"
              className="text-4xl font-bold text-white hover:underline"
              onClick={(e) => e.stopPropagation()} // Prevent expanding when clicking link
            >
              {release.version}
            </a>
            {isLatest && (
              <span className="px-2 py-1 text-xs bg-red-600 rounded">
                Latest
              </span>
            )}
          </div>

          {/* Release date */}
          <div
            className="relative mt-1 text-sm text-gray-400"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            Released: {hovering ? fullDate : shortDate}
          </div>
        </div>

        {/* Expand/collapse chevron */}
        {!isLatest && (
          <div
            className={`text-2xl text-white transition-transform duration-300 ${
              isExpanded ? "rotate-0" : "-rotate-90"
            }`}
          >
            <ArrowDropDownIcon fontSize="large" />
          </div>
        )}
      </div>

      {/* Smooth expandable content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded || isLatest
            ? "max-h-full opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6">
          <div className="h-px bg-white opacity-20" />
        </div>

        <div className="p-6">
          {release.body ? (
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  rehypeSlug,
                  rehypeAutolinkHeadings,
                  rehypeHighlight,
                ]}
                components={{
                  ul: (props) => (
                    <ul {...props} className="space-y-2 text-gray-300" />
                  ),
                  li: (props) => (
                    <li {...props} className="flex gap-2 text-gray-300">
                      <span className="select-none">–</span>
                      <span>{props.children}</span>
                    </li>
                  ),
                  h2: (props) => (
                    <h2
                      {...props}
                      className="mt-8 mb-4 text-xl font-semibold text-white"
                    />
                  ),
                }}
              >
                {release.body}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="italic text-gray-400">No release notes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
