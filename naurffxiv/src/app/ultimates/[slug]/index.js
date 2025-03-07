"use client";
import MdxContent from "@/components/Mdx/MdxContent"
import React from "react";

function recursiveToc(toc) {
    if (!toc) {
        return
    }
    const currLevel = toc.map((li) => (
          <li key={li.id}>
            <a href={`#${li.id}`}>
                {li.value}
            </a>
            {recursiveToc(li.children)}
          </li>
    ))
    return (
        <ul className="list-none">
            {currLevel}
        </ul>
    )
}

const MDXPage = ({params: content, toc}) => {
    return (
        <MdxContent>
            <div className="grid grid-cols-[1fr_2fr_1fr] max-w-[100rem] m-auto">
                    
                <div className="sticky prose prose-invert top-[36rem] self-start">
                {recursiveToc(toc)}
                </div>

                <div className="max-w-[100ch] prose prose-invert m-auto">
                    {content}
                </div>

                <div>
                </div>
            </div>
        </MdxContent>
    )
}

export default MDXPage;