import path from 'path';
import { promises as fs, readdirSync } from 'fs';

// get path based on slug
export function getPath(params) {
    const { difficulty, slug } = params;
    if (slug.length == 1) {
        return path.join(process.cwd(), 'src/markdown', `${difficulty}`)
    } else if (slug.length > 1) {
        return path.join(process.cwd(), 'src/markdown', `${difficulty}`, `${slug[1]}`)
    }
}

export function parseFrontmatter(fileContent) {
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

export function getMdxDir() {
    return path.join(process.cwd(), 'src', 'markdown')
}

// traverses through a nested dictionary
// e.g obj = nested dictionary, pathArray = ["a", "b", "c", "d"]
// getNestedValue() will return obj["a"]["b"]["c"]["d"]
function getNestedValue(obj, pathArray) {
    return pathArray.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

// prioritize _meta.json that are closer to the slug and sort by longest prefix 
function findMatchingMeta(mdxDir, goalPath){
    const metaFiles = readdirSync(mdxDir, { recursive: true })
        .filter((file) => path.basename(file) === "_meta.json")
        .filter((file) => {
            const dirname = path.dirname(file)
            if (dirname === ".") return true  // _meta.json at base folder
            return goalPath.startsWith(file)
        })
    return metaFiles.sort((a, b) => b.length - a.length);
}

export async function findMdxFilepath(params) {
    const {difficulty, slug} = params
    const mdxDir = path.join(getMdxDir(), difficulty) 
    const goalPath = path.join(...slug)

    const metaFiles = findMatchingMeta(mdxDir, goalPath)

    // find file path by traversing through the relevant _meta.json
    let filepath = "";
    for (let i = 0; i < metaFiles.length; i++) {
        const metaFile = metaFiles[i]
        const dirname = path.dirname(metaFile)
        const diff = dirname === "." ? goalPath : goalPath.substring(dirname.length)
        
        const pathArray = diff.split('\\')
        const meta = JSON.parse(await fs.readFile(path.join(mdxDir, metaFile), {encoding: 'utf-8'}))
        const result = getNestedValue(meta, pathArray)
        if (result && result.index) filepath = path.normalize(result.index)
    }
    return filepath
}