"use client";
import MdxLayout from "@/components/Mdx/MdxLayout"
import React from "react";
import TableOfContents from "@/components/Mdx/TableOfContents";
import ScrollScript from "@/components/Scripts/ScrollScript";

const MDXPage = ({params: content, toc}) => {
    return (
        <MdxLayout>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] max-w-[100rem] mx-auto py-6">
                <div className="prose prose-invert top-[5.5rem] self-start hidden lg:block sticky">
                    <TableOfContents toc={toc} />
                </div>

                <article className="max-w-[100ch] prose prose-invert m-auto mx-6">
                    {content}
                </article>

                <div>
                </div>
                <script type="text/javascript" src="/scroll.js" defer/>
                <ScrollScript />
            </div>
        </MdxLayout>
    )
}

export default MDXPage;