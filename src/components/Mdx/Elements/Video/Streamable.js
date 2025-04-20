import clsx from "clsx";

export default function Streamable({
  width = "100%",
  height = "100%",
  videoId,
  className,
}) {
  return (
    <iframe
      src={`https://streamable.com/e/${videoId}?quality=highest`}
      width={width}
      height={height}
      className={clsx("aspect-video", className)}
      allowFullScreen
    />
  );
}
