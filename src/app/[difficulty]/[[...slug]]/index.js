"use client";
import MdxLayout from "@/components/Mdx/MdxLayout"
import React from "react";
import TableOfContents from "@/components/Mdx/TableOfContents";
import QuickLinks from "@/components/Mdx/QuickLinks";
import "./mdx.css";
import "./buffs.scss"

const MDXPage = ({children, toc, siblingData, slug, frontmatter}) => {
    return (
        <MdxLayout>
            <div className="grid grid-cols-1 lg:grid-cols-[90ch_1fr] xl:grid-cols-[1fr_90ch_1fr] max-w-screen-2xl mx-auto">
                <div className="top-[5.5rem] self-start hidden xl:block sticky h-[calc(100vh-100px)] scrollbar">
                    <TableOfContents toc={toc} frontmatter={frontmatter}/>
                </div>

                <article className="max-w-[90ch] prose prose-invert m-auto mx-6 py-6">
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