"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function TwitchClip({
  width = "100%",
  height = "100%",
  videoId,
  className,
}) {
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  return (
    hostname && (
      <iframe
        src={`https://clips.twitch.tv/embed?clip=${videoId}&parent=${hostname}`}
        height={height}
        width={width}
        className={clsx("aspect-video", className)}
        allowFullScreen
      />
    )
  );
}
