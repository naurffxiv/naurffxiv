"use client";
import MdxLayout from "@/components/Mdx/MdxLayout";
import TableOfContents from "@/components/Mdx/TableOfContents";
import QuickLinks from "@/components/Mdx/QuickLinks";
import MobileDrawer from "@/components/Mdx/Layout/MobileDrawer";
import "./mdx.css";
import "./buffs.scss";

function MDXPage({ children, toc, siblingData, slug, frontmatter }) {
  const quickLinks = <QuickLinks siblingData={siblingData} slug={slug} />;

  return (
    <MdxLayout>
      <div className="grid grid-cols-1 lg:grid-cols-[90ch_1fr] xl:grid-cols-[1fr_90ch_1fr] max-w-screen-2xl mx-auto">
        <aside className="top-[5.5rem] self-start hidden xl:block sticky h-[calc(100vh-100px)] scrollbar">
          <TableOfContents toc={toc} frontmatter={frontmatter} />
        </aside>
        <main className="max-w-[90ch] min-h-screen prose prose-invert m-auto mx-6 pt-8">
          {children}
        </main>
        <aside className="prose prose-invert top-[5.5rem] self-start hidden lg:block sticky">
          {quickLinks}
        </aside>
        <MobileDrawer>{quickLinks}</MobileDrawer>
      </div>
    </MdxLayout>
  );
}

export default MDXPage;
