"use client";
import MdxLayout from "@/components/Mdx/MdxLayout"
import React from "react";
import TableOfContents from "@/components/Mdx/TableOfContents";
import QuickLinks from "@/components/Mdx/QuickLinks";

const MDXPage = ({children, toc, siblingData, slug}) => {
    return (
        <MdxLayout>
            <div className="grid grid-cols-1 lg:grid-cols-[90ch_1fr] xl:grid-cols-[1fr_90ch_1fr] max-w-screen-2xl mx-auto py-6">
                <div className="prose prose-invert top-[5.5rem] self-start hidden xl:block sticky">
                    <TableOfContents toc={toc} />
                </div>

                <article className="max-w-[90ch] prose prose-invert m-auto mx-6">
                    {children}
                </article>

                <div className="prose prose-invert top-[5.5rem] self-start hidden lg:block sticky">
                    <QuickLinks siblingData={siblingData} slug={slug}/>
                </div>
            </div>
        </MdxLayout>
    )
}

export default MDXPage;