import { compileMDX } from 'next-mdx-remote/rsc'
import { compile } from '@mdx-js/mdx'
import { promises as fs, readdirSync, readFileSync } from 'fs';
import path from 'path';

import remarkFrontmatter from 'remark-frontmatter';
import rehypeImgSize from 'rehype-img-size';
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExtractToc from "@stefanprobst/rehype-extract-toc";
import rehypeExtractTocExport from "@stefanprobst/rehype-extract-toc/mdx";

import MDXPage from '.';

const MDXComponents = { 
    h1: (props) => <h1 className="scroll-mt-20" {...props} />,
    h2: (props) => <section><h2 className="scroll-mt-20" {...props} /></section>,
    h3: (props) => <section><h3 className="scroll-mt-20" {...props} /></section>,
}

const mdxOptions = {
    remarkPlugins: [
        remarkFrontmatter,
    ],
    rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: {
              ariaHidden: false,
              tabIndex: -1,
              className: 'hash-link',
            },
          },
        ],
        [rehypeImgSize, { dir: 'public' }],
    ],
}

export default async function UltimateMdx({ params }) {
    const rawmdx = await fs.readFile(path.join(process.cwd(), 'src/markdown/ultimates', `${params.slug}.mdx`), 'utf-8');
    const { content } = await compileMDX({
        source: rawmdx,
        components: MDXComponents,
        options: { 
            parseFrontmatter: true, 
            mdxOptions: mdxOptions
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
    
    let metadata = await getUltimatePages()

    return (
        <MDXPage params={content} toc={toc.data.toc} metadata={metadata} slug={params.slug}/>
    )
}

function parseFrontmatter(fileContent) {
    let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
    let match = frontmatterRegex.exec(fileContent)
    let frontMatterBlock = match[1]
    let content = fileContent.replace(frontmatterRegex, '').trim()
    let frontMatterLines = frontMatterBlock.trim().split('\n')
    let metadata = {}
  
    frontMatterLines.forEach((line) => {
      let [key, ...valueArr] = line.split(': ')
      let value = valueArr.join(': ').trim()
      value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
      metadata[key.trim()] = value
    })

    return { metadata: metadata, content }
}

export function getUltimatePages() {
    let mdxDir = path.join(process.cwd(), 'src', 'markdown', 'ultimates')
    let mdxFiles = readdirSync(mdxDir).filter((file) => path.extname(file) === '.mdx')

    return mdxFiles.map((file) => {
        let mdxFile = readFileSync(path.join(mdxDir, file), 'utf-8')
        let {metadata, content} = parseFrontmatter(mdxFile)
        let slug = path.basename(file, path.extname(file))

        return {
            metadata,
            slug,
            content
        }
    })
}

// get the titles for each page
export async function generateMetadata({params}) {
    const { slug } = await params;
    const rawmdx = await fs.readFile(path.join(process.cwd(), 'src/markdown/ultimates', `${slug}.mdx`), 'utf-8');
    
    const { frontmatter } = await compileMDX({source: rawmdx,
        options: { 
            parseFrontmatter: true, 
        },
    });
    return {
        title: frontmatter.title + " | NAUR",
    }
}

// valid slugs
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