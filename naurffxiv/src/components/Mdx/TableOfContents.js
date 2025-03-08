function recursiveToc(toc, level = 0) {
    // base case
    if (!toc) return;

    // ignore first level headers, head straight to h2
    const currLevel = level ? toc.map((li) => (
          <li key={li.id}>
            <a href={`#${li.id}`} className="toc-links">
                {li.value}
            </a>
            {recursiveToc(li.children, level + 1)}
          </li>
    )) : toc.map((li) => (
        <div key={li.id}>
            {recursiveToc(li.children, level + 1)}
        </div>
    ))

    return ( level ? 
        <ul className="list-none ps-1 toc">
            {currLevel}
        </ul> : <div>{currLevel}</div>
    )
}

export default function TableOfContents({toc}) {
    return (
        recursiveToc(toc)
    )
}