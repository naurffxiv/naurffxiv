// next.config.mjs
import createMDX from "@next/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeImgSize from "rehype-img-size";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkToc from "remark-toc";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkToc],
    rehypePlugins: [
      rehypeSlug,
      [rehypeImgSize, { dir: "public" }],
      [
        rehypeAutolinkHeadings,
        {
          behaviour: "append",
          properties: {
            ariaHidden: true,
            tabIndex: -1,
            className: "hash-link",
          },
        },
      ],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xivapi.com",
        port: "",
        pathname: "/i/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/avatars/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/embed/avatars/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/ultimates/:slug",
        destination: "/ultimate/:slug",
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
