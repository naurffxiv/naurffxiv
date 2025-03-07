import { compileMDX } from 'next-mdx-remote/rsc'
import { compile } from '@mdx-js/mdx'
import { promises as fs } from 'fs';
import path from 'path';

import {useMDXComponents} from '@/mdx-components'
import remarkFrontmatter from 'remark-frontmatter';
import rehypeImgSize from 'rehype-img-size';
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExtractToc from "@stefanprobst/rehype-extract-toc";
import rehypeExtractTocExport from "@stefanprobst/rehype-extract-toc/mdx";

import MDXPage from '.';

const components = { 
    h1: (props) => <h1 className="scroll-mt-20" {...props} />,
    h2: (props) => <h2 className="scroll-mt-20" {...props} />,
    h3: (props) => <h3 className="scroll-mt-20" {...props} />,
}

export default async function UltimateMdx({ params }) {
    const rawmdx = await fs.readFile(path.join(process.cwd(), 'src/markdown/ultimates', `${params.slug}.mdx`), 'utf-8');
    const { content, frontmatter } = await compileMDX({
        source: rawmdx,
        components: components,
        options: { 
            parseFrontmatter: true, 
            mdxOptions: {
                remarkPlugins: [
                    remarkFrontmatter,
                ],
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
            }
        },
    })

    
    const toc = await compile(rawmdx, {
        remarkPlugins: [
            remarkFrontmatter,
        ],
        rehypePlugins: [
            rehypeSlug,
            rehypeExtractToc,
            rehypeExtractTocExport,
        ]
    })
    
    return (
        <MDXPage params={content} toc={toc.data.toc}/>
    )
}

export function generateStaticParams() {
    return [
        { slug: 'ucob' },
        { slug: 'uwu' },
        { slug: 'tea' },
        { slug: 'dsr' },
        { slug: 'top' },
        { slug: 'fru' },
    ]
}


export const dynamicParams = false