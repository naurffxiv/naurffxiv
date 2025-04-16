import { readdirSync } from "fs";
import path from "path";
import {
  processMdx,
  getProcessedMdxFromParams,
  readAndDeserializeJson,
  getMdxDir,
  findSiblingMdxFilepath,
  findManuallyAddedQuickLinks,
} from "./helpers";
import { markdownFolders, reservedSlugs } from "@/app/constants";
import MDXPage from ".";
import { notFound } from "next/navigation";

import MDXComponents from "@/components/Mdx/MdxComponents";

// Called when a page is accessed (only once on build with static site generation)
// Finds mdx file to render based on slug then processes the page accordingly
export default async function MdxPage({ params }) {
  const { slug } = params;
  const {
    default: Content,
    toc,
    frontmatter,
    filepath,
    error,
  } = await getProcessedMdxFromParams(params);
  if (error) return notFound();

  const siblingData = await getPages(params);
  const slugArr = slug ? [params.difficulty, ...slug] : [params.difficulty];
  const formedSlug = "/" + slugArr.join("/");
  return (
    <MDXPage
      toc={toc}
      siblingData={siblingData}
      slug={formedSlug}
      frontmatter={frontmatter}
    >
      <Content components={MDXComponents(path.dirname(filepath))} />
    </MDXPage>
  );
}

// get metadata of pages in the same folder as page for quick links
export async function getPages(params) {
  const mdxDir = getMdxDir([params.difficulty]);
  const mdxFiles = await findSiblingMdxFilepath(params);

  let ret = await Promise.all(
    mdxFiles.map(async ({ groups, filepath, slug, order, title }) => {
      const { frontmatter } = await processMdx(path.join(mdxDir, filepath));

      const slugArr = slug ? [params.difficulty, ...slug] : [params.difficulty];
      const formedSlug = "/" + slugArr.join("/");

      return {
        groups,
        metadata: frontmatter,
        slug: formedSlug,
        order,
        title,
      };
    }),
  );
  ret = ret.concat(...(await findManuallyAddedQuickLinks(params)));
  return ret;
}

// set the title for each page based on title set on frontmatter
export async function generateMetadata({ params }) {
  const { title, frontmatter, error } = await getProcessedMdxFromParams(params);
  if (error) return notFound();
  const effectiveTitle = title
    ? title
    : frontmatter.title
      ? frontmatter.title
      : undefined;
  return { title: effectiveTitle ? effectiveTitle + " | NAUR" : "NAUR" };
}

// generate valid slugs based on _meta.json files in markdown folder
export async function generateStaticParams() {
  const mdxDir = path.join(process.cwd(), "src", "markdown");

  // get all paths specified in `markdownFolders`
  const dirsToSearch = markdownFolders.map((folder) => {
    return path.join(mdxDir, folder);
  });

  // find files named "_meta.json"
  const dirs = dirsToSearch.map((dir) => {
    return {
      subtreesToRead: readdirSync(dir, { recursive: true }).filter(
        (file) => path.basename(file) === "_meta.json",
      ),
      folder: path.basename(dir),
    };
  });

  // read and deserialize each json file
  const meta = await Promise.all(
    dirs.map(async (dir) => {
      return {
        subtrees: await Promise.all(
          dir.subtreesToRead.map(async (file) => {
            return {
              subfolder: path.dirname(file),
              tree: await readAndDeserializeJson(
                path.join(mdxDir, dir.folder, file),
              ),
            };
          }),
        ),
        folder: dir.folder,
      };
    }),
  );

  // recursively get slugs from each tree
  function getSlugsFromTree(tree, subfolder, isFirst = false) {
    if (!tree) return [];

    const ret = Object.keys(tree)
      .filter((keyString) => reservedSlugs.includes(keyString) === false)
      .flatMap((keyString) => {
        const key = tree[keyString];
        const currentSlugs = key["index"] ? [keyString] : null;
        const childSlugs = getSlugsFromTree(key).map((childSlug) =>
          [keyString].concat(childSlug),
        );

        return currentSlugs ? [currentSlugs, ...childSlugs] : childSlugs;
      });

    // check if we want to define a base index page e.g /ultimate
    if (isFirst && tree["index"]) {
      if (subfolder === ".") ret.push(undefined);
      else ret.push([]);
    }
    return ret;
  }

  // form final slug format for return
  return [
    process.env.NEXT_PROD !== "true"
      ? { difficulty: "testing", slug: ["page"] }
      : {}, // test page
    ...meta.flatMap((folder) =>
      folder.subtrees.flatMap((subtree) =>
        getSlugsFromTree(subtree.tree, subtree.subfolder, true).map((slug) => ({
          difficulty: folder.folder,
          slug:
            subtree.subfolder === "."
              ? slug
              : subtree.subfolder.split("/").concat(slug),
        })),
      ),
    ),
  ];
}

export const dynamicParams = false;
