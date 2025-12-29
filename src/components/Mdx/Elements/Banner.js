import Image from "next/image";
import clsx from "clsx";

export default function Banner({ src, alt, left = false, ...props }) {
  return (
    <div className="relative h-48 lg:h-56 not-prose">
      <Image
        className={clsx("object-cover rounded-sm", { "object-left": left })}
        src={src}
        alt={alt}
        {...props}
        fill
        // 'unoptimized' removed to generate aspect ratio metadata and prevent CLS.
        // 'sizes="100vw"' ensures correct responsive sizing with 'fill'.
        sizes="100vw"
        priority
      />
    </div>
  );
}
