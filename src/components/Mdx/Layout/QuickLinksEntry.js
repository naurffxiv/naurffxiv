import clsx from "clsx";

// returns a single quick link component
// highlighted if the page matches the slug
function QuickLinkEntry(entry, currentSlug, isFirst) {
  if (entry.slug === currentSlug) {
    return {
      element: (
        <li key={entry.slug} className="ps-0">
          <a
            href={entry.slug}
            className={clsx({
              "block px-4 py-2 text-blue-400 no-underline transition-colors border-r-2 border-blue-400 hover:text-blue-500 rounded-l-md bg-opacity-10 bg-slate-400 hover:bg-opacity-10 hover:bg-slate-300": true,
              "ml-4": isFirst,
            })}
          >
            {entry.title}
          </a>
        </li>
      ),
      active: true,
    };
  } else {
    return {
      element: (
        <li key={entry.slug} className="ps-0">
          <a
            href={entry.slug}
            className={clsx({
              "block px-4 py-2 no-underline transition-colors border-r-2 border-transparent text-slate-200 hover:border-r-2 hover:border-slate-200 hover:text-white rounded-l-md hover:bg-opacity-10 hover:bg-slate-600": true,
              "ml-4": isFirst,
            })}
          >
            {entry.title}
          </a>
        </li>
      ),
      active: false,
    };
  }
}

export default QuickLinkEntry;
