
import path from 'path';

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

