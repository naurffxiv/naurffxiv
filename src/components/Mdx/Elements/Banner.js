import Image from "next/image";
import clsx from "clsx";

export default function Banner({ src, alt, left = false, ...props }) {
  return (
    <div className="relative w-full aspect-[3/1] not-prose">
      <Image
        className={clsx("object-cover rounded-sm", {
          "object-left": left,
          "object-center": !left,
        })}
        src={src}
        alt={alt}
        {...props}
        fill
        sizes="100vw"
        priority
        decoding="sync"
      />
    </div>
  );
}
