import Image from "next/image";
import clsx from "clsx";

export default function Banner({ src, alt, left = false, ...props }) {
  return (
    <div
      className="relative h-48 lg:h-56 not-prose"
      style={{
        minHeight: "12rem",
        position: "relative", // Ensure relative positioning immediately (prevents FOUC)
        width: "100%", // Explicit width
      }}
    >
      <Image
        className={clsx("object-cover rounded-sm", { "object-left": left })}
        src={src}
        alt={alt}
        {...props}
        fill
        sizes="100vw"
        priority
        decoding="sync" // Prevent visual flicker on cached loads
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    </div>
  );
}
