import Image from "next/image";

export default function FightGuideComponent({ entries, title }) {
  return (
    <div>
      <h3 className="text-2xl text-center mt-12">{title}</h3>
      <div
        className={`mt-8 grid gap-x-10 gap-y-4 ${
          entries.length === 1
            ? "grid-cols-1 justify-center"
            : "grid-cols-1 sm:grid-cols-2"
        } mx-auto`}
      >
        {entries.map((entry) => (
          <div
            key={entry.url}
            className="bg-[#10242b] overflow-hidden rounded-lg group"
          >
            <a href={entry.url}>
              <div className="relative h-48 group-hover:brightness-75">
                <Image
                  src={entry.img}
                  fill
                  alt={entry.alt}
                  className="object-cover object-center"
                />
              </div>
              <p className="px-3 py-2 text-lg font-medium text-center group-hover:underline">
                {entry.title}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
