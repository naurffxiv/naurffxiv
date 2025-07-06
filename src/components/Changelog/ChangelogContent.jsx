"use client";

import { useEffect, useState } from "react";
import ReleaseCard from "@/components/Changelog/ReleaseCard";
import { fetchGithubReleases, compareVersions } from "@/utils";
import Image from "next/image";

export default function ChangelogContent() {
  const [releases, setReleases] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchGithubReleases();
        fetched.sort(compareVersions);
        setReleases(fetched);

        if (fetched.length) {
          setExpanded(fetched[0].tag_name);
        }
      } catch (err) {
        console.error("Error fetching releases:", err);
        setReleases([]);
      } finally {
        setLoading(false);
      }
    };

    load();
    window.scrollTo(0, 0);
  }, []);

  const toggleRelease = (version) => {
    setExpanded((prev) => (prev === version ? null : version));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p className="text-lg animate-pulse">Loading changelog...</p>
      </div>
    );
  }

  if (!releases.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-400">
        <p className="mb-2 text-2xl">No releases yet</p>
        <p className="text-lg">No release notes yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl px-4 py-8 mx-auto">
      {/* Top Banner Static Image */}
      <div className="relative w-full aspect-[2.5/1] mb-12 overflow-hidden rounded-lg shadow-lg">
        <Image
          src="/images/changelog.avif"
          alt="Changelog Banner"
          fill
          className="object-cover object-center rounded-lg"
        />
      </div>

      {/* Changelog Release List */}
      <div className="space-y-8">
        {releases.map((release, idx) => (
          <ReleaseCard
            key={release.id}
            release={{
              version: release.tag_name,
              date: release.published_at,
              body: release.body,
            }}
            isExpanded={expanded === release.tag_name}
            toggleRelease={toggleRelease}
            isLatest={idx === 0}
          />
        ))}
      </div>
    </div>
  );
}
