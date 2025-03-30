import QuickLinksCollapsible from "./QuickLinksCollapsible"
import QuickLinkEntry from "./QuickLinksEntry"

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
        return {element: recursiveLinks(tree[key], currentSlug).element, activeChildren: false}
    }

    let activeChildren = false  // let parents know if any of their children are active
    const children = []
    // populate section with pages first, check if active slug is present in this section
    if (tree["pages"]) {
        tree["pages"].forEach(entry => {
            const {element, active} = QuickLinkEntry(entry, currentSlug)
            if (!activeChildren) activeChildren = active
            children.push(element)
        })
    }

    // then populate with subsections
    let sameGroup = 0  // set margin for children vs siblings
    for (const group of groups) {
        if (group === "pages") continue
        const title = group[2] === "-" ? group.substring(3) : group
        const {element, activeChildren: childHasActive} = recursiveLinks(tree[group], currentSlug, false)
        activeChildren = activeChildren || childHasActive
        children.push(
            <li key={group} className={`${sameGroup > 0 ? "mt-4" : "mt-2"} ml-4 p-0 list-none list-inside`}>
                <QuickLinksCollapsible defaultState={childHasActive} title={title}>
                    {element}
                </QuickLinksCollapsible>
            </li>
        )
        sameGroup += 1
    }
    
    return {
        element: <ul className="p-0 m-0 list-none list-inside quick-links-div">{children}</ul>,
        activeChildren
    }
}

export default function QuickLinks({siblingData, slug}) {
    // nb: sorting by order before building the tree ensures
    // the resulting pages array is in the correct order
    siblingData.sort((a, b) => a.metadata.order - b.metadata.order)
    const siblingDataTree = buildTree(siblingData)
    return (
        <div className="list-none quick-links-div min-w-[30ch] w-fit prose prose-invert">
            {recursiveLinks(siblingDataTree, slug).element}
        </div>
    )
}