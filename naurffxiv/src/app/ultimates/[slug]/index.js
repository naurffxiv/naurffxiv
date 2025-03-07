"use client";
import MdxLayout from "@/components/Mdx/MdxLayout"
import React from "react";
function recursiveToc(toc) {
    if (!toc) {
        return
    }
    const currLevel = toc.map((li) => (
          <li key={li.id}>
            <a href={`#${li.id}`} className="toc-links">
                {li.value}
            </a>
            {recursiveToc(li.children)}
          </li>
    ))
    return (
        <ul className="list-none ps-1 toc-links">
            {currLevel}
        </ul>
    )
}

const MDXPage = ({params: content, toc}) => {
    return (
        <MdxLayout>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] max-w-[100rem] mx-auto py-6 text-blue-300">
                    
                <div className="prose prose-invert top-[5.5rem] self-start hidden lg:block sticky toc-links">
                {recursiveToc(toc)}
                </div>

                <article className="max-w-[100ch] prose prose-invert m-auto mx-6">
                    {content}
                </article>

                <div>
                </div>
                <script type="text/javascript" src="/scroll.js" defer/>
            </div>
        </MdxLayout>
    )
}

export default MDXPage;