"use client";

import type { DiscordSessionUser } from "@/types/discord";
import Image from "next/image";
import type { ReactElement } from "react";
import { getDiscordAvatar } from "@/lib/discord/getDiscordAvatar";

type UserAvatarProps = {
  user: DiscordSessionUser;
  size?: number;
  rounded?: boolean;
  className?: string;
  priority?: boolean;
};

export default function UserAvatar({
  user,
  size = 48,
  rounded = true,
  className = "",
  priority = true,
}: UserAvatarProps): ReactElement | null {
  if (!user) return null;

  const avatarUrl = getDiscordAvatar(user);
  const name = user?.name?.trim();
  const discriminator = user?.discriminator?.trim();
  const altText = `${name || discriminator || "User"}'s avatar`;
  const isAnimated = user?.avatar?.startsWith("a_");

  return (
    <Image
      src={avatarUrl}
      alt={altText}
      width={size}
      height={size}
      className={`
        ${rounded ? "rounded-full" : "rounded-md"}
        border border-gray-600 object-cover
        ${className}
      `}
      priority={priority}
      unoptimized={isAnimated}
    />
  );
}
