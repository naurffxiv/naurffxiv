"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import clsx from 'clsx';

export default function TwitchVoD ({ width = "100%", height = "100%", videoId, className }) {
  const embedRef = useRef(null);

  useEffect(() => {
    const initTwitch = () => {
      if (window.Twitch && window.Twitch.Embed) {
        new window.Twitch.Embed(`twitch-embed-${videoId}`, {
          width,
          height,
          video: videoId,
          autoplay: "false",
          layout: "video",
        })
      }
    };

    // Ensure script is loaded before initializing
    if (window.Twitch) {
      initTwitch();
    } else {
      window.addEventListener(`twitchScriptLoaded${videoId}`, initTwitch);
    }

    return () => {
      window.removeEventListener(`twitchScriptLoaded${videoId}`, initTwitch);
    };
  }, [videoId, width, height]);

  return (
    <>
      <Script
        src="https://embed.twitch.tv/embed/v1.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.dispatchEvent(new Event(`twitchScriptLoaded${videoId}`))
        }}
      />
      <div id={`twitch-embed-${videoId}`} ref={embedRef} className={clsx("aspect-video", className)}></div>
    </>
  );
};
