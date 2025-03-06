// next.config.mjs
import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeImgSize from 'rehype-img-size';
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkToc],
    rehypePlugins: [
      rehypeSlug,
      [rehypeImgSize, { dir: 'public' }],
      [
        rehypeAutolinkHeadings,
        {
          behaviour: 'append',
          properties: {
            ariaHidden: true,
            tabIndex: -1,
            className: 'hash-link',
          },
        },
      ],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);