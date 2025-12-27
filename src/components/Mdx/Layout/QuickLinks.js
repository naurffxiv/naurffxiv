import QuickLinkEntry from "./QuickLinksEntry";
import QuickLinksCollapsible from "./QuickLinksCollapsible";
// builds the tree
function buildTree(siblingData) {
  const root = {};

  for (const page of siblingData) {
    let node = root;

    // if page has groups, traverse the tree to the correct node
    if (page.groups) {
      for (const partOfSlug of page.groups) {
        if (!node[partOfSlug]) node[partOfSlug] = {};
        node = node[partOfSlug];
      }
    }

    // add the page to the tree
    if (!node["pages"]) node["pages"] = [];
    node["pages"].push({
      title: page.title || page.metadata.title || "No title set",
      slug: page.slug,
    });
  }

  return root;
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
  if (groups.length === 0) return;
  if (isFirst && groups.length == 1 && groups[0] !== "pages") {
    const key = groups[0];
    return {
      child: recursiveLinks(tree[key], currentSlug).child,
      activeChildren: false,
    };
  }

  let activeChildren = false; // let parents know if any of their children are active
  const children = [];

  // populate section with pages first
  if (tree["pages"]) {
    children.push(
      ...tree["pages"].map((entry) => {
        const { element, active } = QuickLinkEntry(entry, currentSlug, isFirst);
        if (!activeChildren) activeChildren = active;
        return element;
      }),
    );
  }

  // then populate with subsections
  let sameGroup = 0; // set margin for children vs siblings
  for (const group of groups) {
    if (group === "pages") continue;
    const title = group[2] === "-" ? group.substring(3) : group;
    const { child, activeChildren: childHasActive } = recursiveLinks(
      tree[group],
      currentSlug,
      false,
    );
    activeChildren = activeChildren || childHasActive;

    children.push(
      <li
        key={group}
        className={`${sameGroup > 0 ? "mt-4" : "mt-2"} ml-4 p-0 list-none list-inside`}
      >
        <QuickLinksCollapsible defaultState={childHasActive} title={title}>
          {child}
        </QuickLinksCollapsible>
      </li>,
    );
    sameGroup += 1;
  }
  return {
    child: (
      <ul className="p-0 m-0 list-none list-inside quick-links-div">
        {children}
      </ul>
    ),
    activeChildren,
  };
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
    <div className="list-none quick-links-div min-w-[30ch] w-[22rem] prose prose-invert">
      {recursiveLinks(siblingDataTree, slug).child}
    </div>
  );
}
