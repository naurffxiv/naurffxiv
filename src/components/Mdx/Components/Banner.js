import Image from "next/image";
import clsx from "clsx";

export default function Banner({ src, alt, left = false, ...props }) {
  return (
    <div className="relative h-56 not-prose">
      <Image
        className={clsx("object-cover rounded-sm", { "object-left": left })}
        src={src}
        alt={alt}
        {...props}
        fill
      />
    </div>
  );
}
