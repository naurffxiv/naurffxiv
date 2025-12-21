import * as runtime from "react/jsx-runtime";

import { promises as fs, readdirSync } from "fs";
import { spawnSync } from "child_process";

import { cache } from "react";
import { evaluate } from "@mdx-js/mdx";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExtractToc from "@stefanprobst/rehype-extract-toc";
import rehypeExtractTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import rehypeHeaderSections from "@/lib/rehype/rehypeHeaderSections";
import rehypeImgSize from "rehype-img-size";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkSectionize from "remark-sectionize";
import { reservedSlugs } from "@/config/constants";

// process each mdx file and cache it
export const processMdx = cache(async (filepath) => {
  const rawmdx = await fs.readFile(filepath, "utf-8");

  // process mdx
  const processedMdx = await evaluate(rawmdx, {
    ...runtime,
    baseUrl: import.meta.url,
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkSectionize],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            ariaHidden: false,
            tabIndex: -1,
            className: "hash-link",
          },
        },
      ],
      [rehypeImgSize, { dir: "public" }],
      rehypeExtractToc,
      [rehypeExtractTocExport, { name: "toc" }],
      rehypeHeaderSections,
    ],
  });

  /*
        {
            toc,
            frontmatter,
            default
        }
    */
  return processedMdx;
});

// gets last updated timestamp, preferring git commit history, falling back to fs mtime
// Returns ISO string for proper serialization between server and client components
function getGitLastUpdated(filepath) {
  // use spawnSync to avoid shell quoting issues
  const result = spawnSync(
    "git",
    ["log", "-1", "--format=%cI", "--", filepath],
    {
      encoding: "utf-8",
    },
  );
  if (result.status === 0) {
    const trimmed = result.stdout.trim();
    if (trimmed) return trimmed;
  }
  return null;
}

// Gets file path relative to repo root for GitHub API
function getRelativeFilePath(filepath) {
  const repoRoot = process.cwd();
  const relativePath = path.relative(repoRoot, filepath);
  // Convert Windows paths to Unix-style for GitHub API
  return relativePath.replace(/\\/g, "/");
}

// Gets last updated timestamp from GitHub API (for build environments without git)
async function getGitHubLastUpdated(filepath) {
  // Only try GitHub API if we're likely in a CI/build environment
  // Check for common CI environment variables
  const isCI = process.env.NETLIFY || process.env.CI;
  if (!isCI) return null;

  try {
    const relativePath = getRelativeFilePath(filepath);
    const repo = "naurffxiv/naurffxiv";
    const apiUrl = `https://api.github.com/repos/${repo}/commits?path=${encodeURIComponent(relativePath)}&per_page=1`;

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        // GitHub API allows unauthenticated requests with rate limits
        // For higher limits, set GITHUB_TOKEN env var
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }),
      },
    });

    if (!response.ok) {
      console.warn(
        `[getGitHubLastUpdated] GitHub API returned ${response.status} for file: ${filepath}`,
      );
      return null;
    }

    const commits = await response.json();
    if (
      Array.isArray(commits) &&
      commits.length > 0 &&
      commits[0].commit?.committer?.date
    ) {
      return new Date(commits[0].commit.committer.date).toISOString();
    }
  } catch (error) {
    // Log warning for debugging, then fall back to other methods
    console.warn(
      `[getGitHubLastUpdated] Failed to fetch last updated timestamp for file: ${filepath}`,
      error.message || error,
    );
    if (error.stack) {
      console.warn(`[getGitHubLastUpdated] Stack trace:`, error.stack);
    }
  }
  return null;
}

export async function getFileLastUpdated(filepath) {
  // Try git command first (works in local dev)
  const gitTimestamp = getGitLastUpdated(filepath);
  if (gitTimestamp) return gitTimestamp;

  // Try GitHub API (works in Netlify/CI environments)
  const githubTimestamp = await getGitHubLastUpdated(filepath);
  if (githubTimestamp) return githubTimestamp;

  // If both methods fail, return null (component will handle hiding the timestamp)
  return null;
}

// resolves mdx filepath from slug and returns the processed file and relevant information
export async function getProcessedMdxFromParams({ difficulty, slug }) {
  const mdxDir = path.join(getMdxDir(), difficulty);
  // stringify dictionary since objects are compared by pointer instead of value
  const cacheKey = JSON.stringify({ difficulty, slug });
  const { index, ...mdxEntry } = await findMdxEntry(cacheKey);
  if (!index) return { error: `file at ${index} not found` };
  mdxEntry.filepath = path.join(mdxDir, index);

  const lastUpdated = await getFileLastUpdated(mdxEntry.filepath);

  return {
    ...mdxEntry,
    ...(await processMdx(mdxEntry.filepath)),
    lastUpdated,
  };
}

export function getMdxDir(subfolders = []) {
  return path.join(process.cwd(), "src", "markdown", ...subfolders);
}

// traverses through a nested dictionary
// e.g obj = nested dictionary, pathArray = ["a", "b", "c", "d"]
// getNestedValue() will return obj["a"]["b"]["c"]["d"]
function getNestedValue(obj, pathArray) {
  return pathArray.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
    obj,
  );
}

// prioritize _meta.json that are closer to the slug and sort by longest prefix
function findMatchingMeta(mdxDir, goalPath) {
  const metaFiles = readdirSync(mdxDir, { recursive: true })
    .filter((file) => path.basename(file) === "_meta.json")
    .filter((file) => {
      const dirname = path.dirname(file);
      if (dirname === ".") return true; // _meta.json at base folder
      return goalPath.startsWith(dirname);
    });
  return metaFiles.sort((a, b) => b.length - a.length);
}

// goes through relevant _meta.json and gets the filepath of
// relevant mdx files based on the subfunc passed into the function
async function findMdxShared({ difficulty, slug }, subfunc) {
  const mdxDir = path.join(getMdxDir(), difficulty);
  const goalPath = slug ? path.join(...slug) : ".";

  const metaFiles = findMatchingMeta(mdxDir, goalPath);

  // find file path by traversing through the relevant _meta.json
  for (let i = 0; i < metaFiles.length; i++) {
    const metaFile = metaFiles[i];
    const dirname = path.dirname(metaFile);

    // strip matching path, then prepare to traverse through nested dictionary
    let diff =
      dirname === "." ? goalPath : goalPath.substring(dirname.length + 1);
    if (diff.length == 0) diff = ".";
    const pathArray = diff === "." ? [] : diff.split(path.sep);
    const meta = await readAndDeserializeJson(path.join(mdxDir, metaFile), {
      encoding: "utf-8",
    });
    const ret = await subfunc(meta, pathArray, dirname);
    if (ret) return ret;
  }
  return;
}

// read, deserialize, and cache a json file (_meta.json)
export const readAndDeserializeJson = cache(async (filepath) => {
  const file = await fs.readFile(filepath);
  return JSON.parse(file, { encoding: "utf-8" });
});

// gets the relevant information of a specific mdx file
// takes a *stringified* dict {difficulty, slug} as an
// argument due to how object comparison works in js
const findMdxEntry = cache(async (params) => {
  params = JSON.parse(params);
  return await findMdxShared(params, findMdxEntryHelper);
});

function findMdxEntryHelper(meta, pathArray, dirname) {
  const result = getNestedValue(meta, pathArray);
  if (result) {
    result.index = path.join(dirname, path.normalize(result.index));
    return result;
  }
  return;
}

// gets the filepaths of a mdx file and its siblings in an array
export async function findSiblingMdxFilepath(params) {
  return findMdxShared(params, findSiblingHelper);
}

function findSiblingHelper(meta, pathArray, dirname) {
  if (pathArray.length == 0)
    return [{ filepath: path.join(dirname, meta["index"]) }];
  const finalSlug = pathArray[pathArray.length - 1];
  const parent = getNestedValue(meta, pathArray.slice(0, -1));
  if (!parent) return;

  // get groups
  let groups = [];
  const page = parent[finalSlug];
  if ("groups" in page) {
    groups = page.groups;
  }

  // collect sibling information
  let ret = Object.keys(parent)
    .filter((key) => !reservedSlugs.includes(key))
    .filter((key) => {
      // true if both original slug and sibling slug share groups
      let siblingGroups = getNestedValue(parent, [key, "groups"]);
      if (
        groups &&
        siblingGroups &&
        siblingGroups.filter((group) => groups.includes(group)).length
      )
        return true;

      // true if both original/siblings don't have any groups
      if (!groups.length && !siblingGroups) return true;
      return false;
    })
    .map((key) => {
      let siblingGroups = getNestedValue(parent, [key, "groups"]);
      let title = getNestedValue(parent, [key, "title"]);
      let order = getNestedValue(parent, [key, "order"]);
      return {
        filepath: parent[key]["index"] ? parent[key]["index"] : null,
        groups: siblingGroups,
        slug: [...pathArray.slice(0, -1), key],
        title,
        order,
      };
    });

  // filter null values then create the full filename
  ret = ret.filter((page) => page.filepath);
  ret.forEach((page) => {
    page.filepath = path.join(dirname, page.filepath);
  });
  return ret;
}

// process manually added quick link entries
export async function findManuallyAddedQuickLinks(params) {
  return findMdxShared(params, findManuallyAddedQuickLinksHelper);
}

async function findManuallyAddedQuickLinksHelper(meta, pathArray, dirname) {
  const page = getNestedValue(meta, pathArray);
  const manualAdditions = page["sidebar"];
  if (!manualAdditions || manualAdditions.length === 0) return [];

  return await Promise.all(
    manualAdditions.map(async (entry) => {
      let finalGroups = entry.groups;
      let finalMetadata = {};
      finalMetadata.title = entry.title;
      finalMetadata.order = entry.order;

      if (entry.type === "mdx") {
        const splitSlug = entry.slug.split("/");
        const difficulty = splitSlug[0];
        const slug = splitSlug.slice(1);

        // override priority: sidebar > _meta.json entry > frontmatter
        const {
          title: metaTitle,
          order: metaOrder,
          frontmatter,
          groups: metaGroups,
        } = await getProcessedMdxFromParams({ difficulty, slug });
        finalGroups = finalGroups ?? metaGroups;
        finalMetadata.title =
          finalMetadata.title || metaTitle || frontmatter?.title;
        finalMetadata.order =
          finalMetadata.order ?? metaOrder ?? frontmatter?.order;
      }

      // final check for missing entries
      finalGroups = finalGroups ?? [];
      finalMetadata.title = finalMetadata.title || "No title set";
      finalMetadata.order = finalMetadata.order ?? 0;

      return {
        groups: finalGroups,
        metadata: finalMetadata,
        slug: entry.slug,
      };
    }),
  );
}
