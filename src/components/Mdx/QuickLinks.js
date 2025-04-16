// builds the tree
function buildTree(siblingData) {
  const root = {};

  for (const page of siblingData) {
    let node = root;

    if (page.groups) {
      for (const partOfSlug of page.groups) {
        if (!node[partOfSlug]) node[partOfSlug] = {};
        node = node[partOfSlug];
      }
      if (!node["pages"]) node["pages"] = [];
      node["pages"].push({
        title: page.title || page.metadata.title || "No title set",
        slug: page.slug,
      });
    }
  }

  return root;
}

// returns a single quick link component
// highlighted if the page matches the slug
function quickLinkEntry(entry, currentSlug) {
  if (entry.slug === currentSlug) {
    return (
      <li key={entry.slug} className="ps-0">
        <a
          href={entry.slug}
          className="block px-4 py-2 text-blue-400 no-underline transition-colors border-r-2 border-blue-400 hover:text-blue-500 rounded-l-md bg-opacity-10 bg-slate-400 hover:bg-opacity-10 hover:bg-slate-300"
        >
          {entry.title}
        </a>
      </li>
    );
  } else {
    return (
      <li key={entry.slug} className="ps-0">
        <a
          href={entry.slug}
          className="block px-4 py-2 no-underline transition-colors border-r-2 border-transparent text-slate-200 hover:border-r-2 hover:border-slate-200 hover:text-white rounded-l-md hover:bg-opacity-10 hover:bg-slate-600"
        >
          {entry.title}
        </a>
      </li>
    );
  }
}

function recursiveLinks(tree, currentSlug, isFirst = true) {
  /*
        skip top level groups without any siblings, for example:
        archive ew anabaseios
        archive ew abyssos
        archive ew asphodelos
        would skip archive and ew

        archive ew anabaseios
        archive dt aac-lhw
        would skip only archive
    */
  const groups = Object.keys(tree);
  if (isFirst && groups.length == 1 && groups[0] !== "pages") {
    const key = groups[0];
    return <>{recursiveLinks(tree[key], currentSlug)}</>;
  }

  const children = [];

  // populate section with pages first
  if (tree["pages"]) {
    children.push(
      ...tree["pages"].map((entry) => quickLinkEntry(entry, currentSlug)),
    );
  }

  // then populate with subsections
  let sameGroup = 0; // set margin for children vs siblings
  for (const group of groups) {
    if (group === "pages") continue;
    const title = group[2] === "-" ? group.substring(3) : group;
    children.push(
      <li
        key={group}
        className={`${sameGroup > 0 ? "mt-4" : "mt-2"} ml-4 p-0 list-none list-inside`}
      >
        <h2 className="mt-4 mb-2 ml-4">{title}</h2>
        {recursiveLinks(tree[group], currentSlug, false)}
      </li>,
    );
    sameGroup += 1;
  }
  return (
    <ul className="p-0 m-0 list-none list-inside quick-links-div">
      {children}
    </ul>
  );
}

const quickLinksSort = (a, b) => {
  if (a.groups && b.groups) {
    const shortestGroup =
      a.groups.length < b.groups.length ? a.groups.length : b.groups.length;
    // strcmp each group
    for (let i = 0; i < shortestGroup; i++) {
      const cmp = a.groups[i].localeCompare(b.groups[i]);
      if (cmp !== 0) return cmp;
    }

    // if one is a subset of the other, the shorter one comes first
    if (a.groups.length !== b.groups.length) {
      return a.groups.length - b.groups.length;
    }
  } else {
    // if one has groups and the other doesn't, the one without groups comes first
    if (a.groups) return 1;
    if (b.groups) return -1;
  }

  // sort by order if groups are equal
  let orderA =
    a.order !== undefined
      ? a.order
      : a.metadata.order !== undefined
        ? a.metadata.order
        : 0;
  let orderB =
    b.order !== undefined
      ? b.order
      : b.metadata.order !== undefined
        ? b.metadata.order
        : 0;

  let res = orderA - orderB;
  if (res !== 0) return res;

  // sort by title if order is equal
  let titleA =
    a.title !== undefined
      ? a.title
      : a.metadata.title !== undefined
        ? a.metadata.title
        : "No title set";
  let titleB =
    b.title !== undefined
      ? b.title
      : b.metadata.title !== undefined
        ? b.metadata.title
        : "No title set";
  return titleA.localeCompare(titleB);
};

export default function QuickLinks({ siblingData, slug }) {
  // nb: sorting by order before building the tree ensures
  // the resulting pages array is in the correct order
  siblingData.sort(quickLinksSort);
  const siblingDataTree = buildTree(siblingData);
  return (
    <div className="list-none quick-links-div min-w-[30ch] w-fit prose prose-invert">
      {recursiveLinks(siblingDataTree, slug)}
    </div>
  );
}
