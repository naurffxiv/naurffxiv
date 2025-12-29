import Image from "next/image";
import clsx from "clsx";

export default function Banner({ src, alt, left = false, ...props }) {
  return (
    <div
      className="relative h-48 lg:h-56 not-prose overflow-hidden"
      style={{
        width: "100%",
      }}
    >
      <Image
        className={clsx("rounded-sm", { "object-left": left })}
        src={src}
        alt={alt}
        {...props}
        fill
        sizes="100vw"
        priority
        style={{
          objectFit: "cover",
          objectPosition: left ? "left center" : "center center",
        }}
      />
    </div>
  );
}
