export default function QuickLinks({metadata, slug}) {
    const arr = Array(metadata.length).fill(0)
    metadata.forEach(element => {
        arr[element.metadata.order] = element
    });
    return (
        <div>
            <ul className="list-none quick-links-div w-fit">
                {arr.map((ultimate) => {
                    return (
                    !slug || ultimate.slug == slug[slug.length-1] ? 
                    <li key={ultimate.slug}>
                        <a href={ultimate.slug} className="block no-underline text-blue-400 hover:text-blue-500 transition-colors rounded-md bg-opacity-10 bg-slate-400 hover:bg-opacity-10 hover:bg-slate-300 py-2 px-4">
                            {ultimate.metadata.title}
                        </a>
                    </li>
                        :
                    <li key={ultimate.slug}>
                        <a href={ultimate.slug} className="block no-underline text-slate-200 hover:text-white transition-colors rounded-md hover:bg-opacity-10 hover:bg-slate-600 py-2 px-4">
                            {ultimate.metadata.title}
                        </a>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}