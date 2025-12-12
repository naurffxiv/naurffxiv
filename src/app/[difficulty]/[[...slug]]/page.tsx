import {
  findManuallyAddedQuickLinks,
  findSiblingMdxFilepath,
  getMdxDir,
  getProcessedMdxFromParams,
  processMdx,
  readAndDeserializeJson,
} from "./helpers";
import { markdownFolders, reservedSlugs } from "@/config/constants";

import { JSX } from "react";
import MDXComponents from "@/components/Mdx/Layout/MdxComponents";
import MDXPage from "./index";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "path";
import { readdirSync } from "fs";

type QuickLinksEntry = {
  groups?: string[];
  metadata?: { [key: string]: any };
  slug: string;
  order?: number;
  title?: string;
};

// --- Page Rendering ---
// Called when a page is accessed (only once on build with static site generation)
// Finds mdx file to render based on slug then processes the page accordingly
// if we ever update to next.js 15, this will be a Promise and must be awaited
type Params = { difficulty: string; slug?: string[] };
export default async function MdxPage({
  params,
}: {
  params: Params;
}): Promise<JSX.Element> {
  const { difficulty, slug = [] } = params;

  const {
    default: Content,
    toc,
    frontmatter,
    filepath,
    lastUpdated,
    error,
  } = await getProcessedMdxFromParams({ difficulty, slug });

  if (error) return notFound();

  const siblingData = await getPages(params);
  const formedSlug = "/" + [difficulty, ...slug].join("/");

  return (
    <MDXPage
      toc={toc}
      siblingData={siblingData}
      slug={formedSlug}
      frontmatter={frontmatter}
    >
      <Content
        components={MDXComponents(path.dirname(filepath), lastUpdated)}
      />
    </MDXPage>
  );
}

type PageInfo = {
  groups?: string[];
  filepath: string;
  slug: string[];
  order?: number;
  title?: string;
};

// --- Quick Links Data ---
// get info for the page's Quick Links component
async function getPages(params: Params): Promise<QuickLinksEntry[]> {
  const mdxDir = getMdxDir([params.difficulty]);
  const mdxFiles = await findSiblingMdxFilepath(params);

  const siblingPages = (await Promise.all(
    mdxFiles.map(async (file: PageInfo) => {
      const { frontmatter } = await processMdx(
        path.join(mdxDir, file.filepath),
      );
      const slugArr = file.slug
        ? [params.difficulty, ...file.slug]
        : [params.difficulty];
      return {
        groups: file.groups,
        metadata: frontmatter,
        slug: "/" + slugArr.join("/"),
        order: file.order,
        title: file.title,
      } as QuickLinksEntry;
    }),
  )) as QuickLinksEntry[];

  const manualQuickLinks = (await findManuallyAddedQuickLinks(
    params,
  )) as QuickLinksEntry[];
  return [...siblingPages, ...manualQuickLinks];
}

// --- Page Metadata ---
// set the title for each page based on title set on frontmatter
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { difficulty, slug = [] } = params;

  const { title, frontmatter, error } = await getProcessedMdxFromParams({
    difficulty,
    slug,
  });

  if (error) return notFound();

  const effectiveTitle = title || frontmatter.title;
  return {
    title: effectiveTitle ? `${effectiveTitle} | NAUR` : "NAUR",
  };
}

// --- Static Params Generation ---
// generate valid slugs based on _meta.json files in markdown folder
export async function generateStaticParams(): Promise<Params[]> {
  const mdxDir = path.join(process.cwd(), "src", "markdown");

  // get all paths specified in `markdownFolders`
  const dirs = markdownFolders.map((folder) => {
    const fullPath = path.join(mdxDir, folder);
    const files = readdirSync(fullPath, { recursive: true }) as string[];
    return {
      folder,
      subtreesToRead: files.filter(
        (file) =>
          typeof file === "string" && path.basename(file) === "_meta.json",
      ),
    };
  });

  // read and deserialize each json file
  const meta = await Promise.all(
    dirs.map(async ({ folder, subtreesToRead }) => ({
      folder,
      subtrees: await Promise.all(
        subtreesToRead.map(async (file) => ({
          subfolder: path.dirname(file),
          tree: await readAndDeserializeJson(path.join(mdxDir, folder, file)),
        })),
      ),
    })),
  );

  // recursively get slugs from each tree
  // refactoring to the "any" type to a more specific type will have to be its own PR
  function getSlugsFromTree(
    tree: any,
    subfolder: string,
    isFirst = false,
  ): string[][] {
    if (!tree) return [];

    const ret: string[][] = Object.keys(tree)
      .filter((key) => !reservedSlugs.includes(key))
      .flatMap((key) => {
        const value = tree[key];
        const current = value.index ? [key] : null;
        const children = getSlugsFromTree(value, subfolder).map((child) => [
          key,
          ...child,
        ]);
        return current ? [current, ...children] : children;
      });

    // check if we want to define a base index page e.g /ultimate
    if (isFirst && tree.index) {
      ret.push(subfolder === "." ? [] : []);
    }

    return ret;
  }

  // form final slug format for return
  const staticParams = meta.flatMap(({ folder, subtrees }) =>
    subtrees.flatMap(({ subfolder, tree }) =>
      getSlugsFromTree(tree, subfolder, true).map((slug) => ({
        difficulty: folder,
        slug: subfolder === "." ? slug : [...subfolder.split("/"), ...slug],
      })),
    ),
  );

  const ret = [...staticParams];
  if (process.env["NEXT_PROD"] !== "true") {
    // add test page for development environments
    ret.push({ difficulty: "testing", slug: ["page"] });
  }
  return ret;
}

export const dynamicParams = false;
