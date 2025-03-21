import ScrollSpy from 'react-scrollspy-navigation';

// recursively crawls through the tree generated by @stefanprobst/rehype-extract-toc
// and generates the table of contents
function recursiveToc(toc, level = 0) {
    // ignore first level headers, head straight to h2
    const currLevel = level ? toc.map((li) => (
          <li key={li.id}>
            <a href={`#${li.id}`} className="toc-links">
                {li.value}
            </a>
            <div>{li.children ? recursiveToc(li.children, level + 1) : <></>}</div>
          </li>
    )) : toc.map((li) => (
        <div key={li.id}>
            {li.children ? recursiveToc(li.children, level + 1) : <></>}
        </div>
    ))

    return ( level ? 
        <ul className="list-none ps-1 toc">
            {currLevel}
        </ul> : <>{currLevel}</>
    )
}

export default function TableOfContents({toc, frontmatter}) {

    return (
        <ScrollSpy activeClass="toc-current" offsetTop="80">      
            <nav className={`toc${frontmatter.collapseToc ? " toc-collapse" : ""}`}>
                {recursiveToc(toc)}
            </nav>
        </ScrollSpy>
    )
}