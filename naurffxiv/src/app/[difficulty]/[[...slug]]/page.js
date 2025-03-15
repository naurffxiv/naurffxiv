import { compileMDX } from 'next-mdx-remote/rsc'
import { compile } from '@mdx-js/mdx'
import { promises as fs, readdirSync, readFileSync } from 'fs';
import path from 'path';
import { getPath, parseFrontmatter } from './helpers';

import remarkFrontmatter from 'remark-frontmatter';
import rehypeImgSize from 'rehype-img-size';
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExtractToc from "@stefanprobst/rehype-extract-toc";
import rehypeExtractTocExport from "@stefanprobst/rehype-extract-toc/mdx";

import { markdownFolders, markdownSubfolders } from '@/app/constants';
import MDXPage from '.';

const MDXComponents = { 
    h1: (props) => <h1 className="scroll-mt-20" {...props} />,
    h2: (props) => <section><h2 className="scroll-mt-20" {...props} /></section>,
    h3: (props) => <section><h3 className="scroll-mt-20" {...props} /></section>,
}

// mdx to html options
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

export default async function MdxPage({ params }) {
    const { slug } = await params;
    let rawmdx = await fs.readFile(path.join(getPath(params), `${slug[0]}.mdx`), 'utf-8')

    // convert mdx to html
    const { content } = await compileMDX({
        source: rawmdx,
        components: MDXComponents,
        options: { 
            parseFrontmatter: true, 
            mdxOptions: mdxOptions
        },
    })
    
    // get toc tree
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
    
    let metadata = await getPages(params)

    return (
        <MDXPage params={content} toc={toc.data.toc} metadata={metadata} slug={slug}/>
    )
}

// get metadata of pages in the same folder as page for quick links
export function getPages(params) {
    let mdxDir = getPath(params)
    let mdxFiles = readdirSync(mdxDir).filter((file) => path.extname(file) === '.mdx')
    
    return mdxFiles.map((file) => {
        let mdxFile = readFileSync(path.join(mdxDir, file), 'utf-8')
        let {metadata, content} = parseFrontmatter(mdxFile)
        let slug = path.basename(file, path.extname(file))
        let fight = slug
        // if it's within a subfolder, form slug in the format like "../guides/fight"
        if (params.slug.length > 1) {
            slug = ["..", slug, params.slug[1]].join('/')
        }
        
        return {
            metadata,
            slug,
            content,
            fight,
        }
    })
}

// set the title for each page based on title set on frontmatter
export async function generateMetadata({params}) {
    const { slug } = await params;
    let rawmdx = await fs.readFile(path.join(getPath(params), `${slug[0]}.mdx`), 'utf-8');
    
    const { frontmatter } = await compileMDX({source: rawmdx,
        options: { 
            parseFrontmatter: true, 
        },
    });

    let title = frontmatter.title ? frontmatter.title + " | NAUR" : "NAUR" 

    return {title: title}
}

// generate valid slugs based on _meta.json files in markdown folder
export async function generateStaticParams() {
    let mdxDir = path.join(process.cwd(), 'src', 'markdown')

    // get all paths specified in `markdownFolders`
    const dirsToSearch = markdownFolders.map(folder => {
        return path.join(mdxDir, folder)
    })

    // find files named "_meta.json"
    const dirs = dirsToSearch.map(dir => {
        return {
            subtreesToRead: readdirSync(dir, { recursive: true })
                    .filter((file) => path.basename(file) === "_meta.json"),
            folder: path.basename(dir),
        }
    })

    // read and deserialize each json file
    const meta = await Promise.all(dirs.map(async dir => {
        return {
            subtrees: await Promise.all(dir.subtreesToRead.map(async file => {
                return {
                    subfolder: path.dirname(file),
                    tree: JSON.parse(await fs.readFile(path.join(mdxDir, dir.folder, file), {encoding: 'utf-8'}))
                }})),
            folder: dir.folder,
        }
    }))

    // recursively get slugs from each tree
    function getSlugsFromTree(tree, isFirst = false) {
        if (!tree) return [];

        const ret =  Object.keys(tree)
            .filter(keyString => keyString !== "index")
            .flatMap(keyString => {
                const key = tree[keyString];
                const currentSlugs = key["index"] ? [keyString] : null;
                const childSlugs = getSlugsFromTree(key).map(childSlug => [keyString].concat(childSlug));
                
                return currentSlugs ? [currentSlugs, ...childSlugs] : childSlugs;
            });
        
        // check if we want to define a base index page e.g /ultimates
        if (isFirst && tree["index"]) {
            ret.push(undefined)
        }
        return ret
    }

    // form final slug format for return
    return meta.flatMap(folder => 
        folder.subtrees.flatMap(subtree => 
            getSlugsFromTree(subtree.tree, true).map(slug => ({
                difficulty: folder.folder,
                slug: subtree.subfolder === "." ? slug : subtree.subfolder.split("/").concat(slug)
            }))
        )
    )
}

export const dynamicParams = false