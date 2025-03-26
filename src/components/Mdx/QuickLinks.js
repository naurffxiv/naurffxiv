// builds the tree
function buildTree(siblingData) {
    const root = {}
  
    for (const page of siblingData) {
      let node = root
      
      if (page.groups) {
        for (const partOfSlug of page.groups) {
            if (!node[partOfSlug]) node[partOfSlug] = {}
            node = node[partOfSlug]
          }
      }
      if (!node["pages"]) node["pages"] = []
      node["pages"].push({title: page.metadata.title, slug: page.slug})
    }
    
    return root
}

// returns a single quick link component
// highlighted if the page matches the slug
function quickLinkEntry(entry, currentSlug) {
    if (entry.slug === currentSlug) {
        return (
                <li key={entry.slug} className="ps-0">
                    <a href={entry.slug} className="block border-r-2 border-blue-400 no-underline text-blue-400 hover:text-blue-500 transition-colors rounded-l-md bg-opacity-10 bg-slate-400 hover:bg-opacity-10 hover:bg-slate-300 py-2 px-4">
                        {entry.title}
                    </a>
                </li>
        )
    } else {
        return (
            <li key={entry.slug} className="ps-0">
                <a href={entry.slug} className="block border-r-2 border-transparent no-underline text-slate-200 hover:border-r-2 hover:border-slate-200 hover:text-white transition-colors rounded-l-md hover:bg-opacity-10 hover:bg-slate-600 py-2 px-4">
                    {entry.title}
                </a>
            </li>
        )
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
   const groups = Object.keys(tree)
    if (isFirst && groups.length == 1 && groups[0] !== "pages") {
        const key = groups[0]
        return <>{recursiveLinks(tree[key], currentSlug)}</>
    }

    const children = []

    // populate section with pages first
    if (tree["pages"]) {
        children.push(...tree["pages"].map(entry => quickLinkEntry(entry, currentSlug)))
    }

    // then populate with subsections
    let sameGroup = 0  // set margin for children vs siblings
    for (const group of groups) {
        if (group === "pages") continue
        const title = group[2] === "-" ? group.substring(3) : group
        children.push(
            <li key={group} className={`${sameGroup > 0 ? "mt-4" : "mt-2"} ml-4 p-0 list-none list-inside`}>
                <h2 className="ml-4 mt-4 mb-2">{title}</h2>
                {recursiveLinks(tree[group], currentSlug, false)}
            </li>
        )
        sameGroup += 1
    }
    return <ul className="list-none quick-links-div m-0 p-0 list-inside">{children}</ul>
}

export default function QuickLinks({siblingData, slug}) {
    // nb: sorting by order before building the tree ensures
    // the resulting pages array is in the correct order
    siblingData.sort((a, b) => a.metadata.order - b.metadata.order)
    const siblingDataTree = buildTree(siblingData)
    return (
        <div className="list-none quick-links-div min-w-[30ch] w-fit prose prose-invert">
            {recursiveLinks(siblingDataTree, slug)}
        </div>
    )
}