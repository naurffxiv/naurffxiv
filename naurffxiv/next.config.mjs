// next.config.mjs
import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeImgSize from 'rehype-img-size';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [[rehypeImgSize, { dir: 'public' }]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);