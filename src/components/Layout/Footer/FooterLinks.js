export default function FooterLinks({ title, links, className }) {
  return (
    <div className={`list-none ${className}`}>
      <p className="text-xl text-[#007EA7] font-bold">{title}</p>
      <ul className="columns-3xs">
        {links.map((item) => {
          const isExternal = item.url && item.url.startsWith("http");
          return (
            <li key={item.url} className="">
              <a
                href={item.url}
                className="hover:underline text-nowrap xl:px-0"
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
