import clsx from "clsx";

// returns a single quick link component
// highlighted if the page matches the slug
function QuickLinkEntry(entry, currentSlug, isFirst) {
  const isActive = entry.slug === currentSlug;

  const baseClasses =
    "block px-4 py-2 no-underline transition-colors rounded-l-md";
  const activeClasses =
    "text-blue-400 border-r-2 border-blue-400 hover:text-blue-500 bg-opacity-10 bg-slate-400 hover:bg-opacity-10 hover:bg-slate-300";
  const inactiveClasses =
    "text-slate-200 border-r-2 border-transparent hover:border-slate-200 hover:text-white hover:bg-opacity-10 hover:bg-slate-600";

  return {
    element: (
      <li key={entry.slug} className="ps-0">
        <a
          href={entry.slug}
          className={clsx(
            baseClasses,
            isActive ? activeClasses : inactiveClasses,
            { "ml-4": isFirst },
          )}
        >
          {entry.title}
        </a>
      </li>
    ),
    active: isActive,
  };
}

export default QuickLinkEntry;
