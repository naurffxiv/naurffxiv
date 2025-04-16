// TypeScript Migration Note:
// Keeping getPages in a separate module to avoid breaking Next.js route typing.
// Moving this into page.tsx throws:
// TS2344: Type '(params: any) => Promise<any[]>' is not assignable to type 'never'
import path from "path";
import {
  processMdx,
  getMdxDir,
  findSiblingMdxFilepath,
  findManuallyAddedQuickLinks,
} from "./helpers";

type Params = {
  difficulty: string;
  slug?: string[];
};

type PageInfo = {
  groups: string[];
  filepath: string;
  slug: string[];
  order: number;
  title: string;
};

export async function getPages(params: Params) {
  const mdxDir = getMdxDir([params.difficulty]);
  const mdxFiles = await findSiblingMdxFilepath(params);

  const siblingPages = await Promise.all(
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
      };
    }),
  );

  const manualQuickLinks = await findManuallyAddedQuickLinks(params);
  return [...siblingPages, ...manualQuickLinks];
}
