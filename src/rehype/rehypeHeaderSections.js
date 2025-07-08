import {visit} from 'unist-util-visit'

/*
    This rehype plugin searches for <section> tags and then checks whether its first child 
    is a header tag from h2-h6. If it is, transfer the header's id to the section instead.

    This makes it so that fragments target the section. It also improves IntersectionObserver
    since it is now tracking an entire section instead of a single header.
*/
export default function rehypeHeaderSections() {
    return function (tree) {
        visit(tree, 'element', function (node) {
            if (node.tagName !== 'section') return
            if (!node.children) return

            let allowedTags = ['h2', 'h3', 'h4', 'h5', 'h6']
            let firstChild = node.children[0]

            if (allowedTags.indexOf(firstChild.tagName) === -1) return
            
            node.properties.id = firstChild.properties.id
            node.properties.class="scroll-mt-20"
            firstChild.properties.id = null
        })
    }
}