"use client";
import MdxLayout from "@/components/Mdx/MdxLayout"
import React from "react";
import TableOfContents from "@/components/Mdx/TableOfContents";
import ScrollScript from "@/components/Scripts/ScrollScript";
import QuickLinks from "@/components/Mdx/QuickLinks";

const MDXPage = ({params: content, toc, metadata, slug}) => {
    return (
        <MdxLayout>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] max-w-[100rem] mx-auto py-6">
                <div className="prose prose-invert top-[5.5rem] self-start hidden lg:block sticky">
                    <TableOfContents toc={toc} />
                </div>

                <article className="max-w-[100ch] prose prose-invert m-auto mx-6">
                    {content}
                </article>

                <div className="prose prose-invert top-[5.5rem] self-start hidden lg:block sticky">
                    <QuickLinks metadata={metadata} slug={slug}/>
                </div>
                <ScrollScript />
            </div>
        </MdxLayout>
    )
}

export default MDXPage;