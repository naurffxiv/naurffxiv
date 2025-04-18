"use client";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import React from "react";

import { icons } from "@/app/assets.js";

import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

export default function NavBar() {
  return (
    <>
      <AppBar position="sticky" sx={sx.appBar} elevation={0}>
        <Toolbar sx={sx.toolbar} disableGutters>
          <Typography sx={sx.naurIconContainer}>
            <IconButton size="small">
              <Link href="/">
                <Image
                  src={icons.Naur}
                  alt="NAUR icon"
                  height="40"
                  width="40"
                />
              </Link>
            </IconButton>
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <DesktopMenu />
          </Box>

          {/* Discord Link */}
          <Box sx={sx.discordIconContainer}>
            <IconButton size="small">
              <Link
                href="https://discord.com/invite/naurffxiv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={icons.Discord}
                  alt="Discord logo"
                  height="30"
                  width="30"
                />
              </Link>
            </IconButton>
          </Box>

          {/* Mobile menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <MobileMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

const sx = {
  appBar: {
    background: "linear-gradient(to bottom, #28506E, #061A33)",
  },
  toolbar: {
    px: 2,
    width: "100%",
    maxWidth: "1536px",
    marginX: "auto",
  },
  naurIconContainer: {
    flexGrow: 1,
  },
  discordIconContainer: {
    px: 1,
  },
};
