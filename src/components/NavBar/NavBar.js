"use client";
import React from "react";
import { Fragment } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  MenuItem,
  MenuList,
  Menu,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import {
  pages,
  ultimateList,
  savageList,
  extremeList,
} from "@/app/constants.js";
import MenuIcon from "@mui/icons-material/Menu";
import { icons } from "@/app/assets.js";
import ContentDropdown from "./ContentDropdown.js";
import SharedNavLinks from "./SharedNavLinks";

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Fragment>
      <AppBar
        position="sticky"
        sx={{ background: "linear-gradient(to bottom, #28506E, #061A33)" }}
        elevation={0}
      >
        <Toolbar
          sx={{ px: 2, width: "100%", maxWidth: "1536px", marginX: "auto" }}
          disableGutters
        >
          <Typography sx={{ flexGrow: 1 }}>
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
            <MenuList sx={{ display: "flex" }}>
              <SharedNavLinks isMobile={false} />
            </MenuList>
          </Box>
          <Box sx={{ px: 1 }}>
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
          {/* Hamburger menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="icon-button"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          {/* Mobile menu */}
          <Menu
            disableScrollLock
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiMenuItem-root": {
                justifyContent: "flex-end",
              },
            }}
          >
            <SharedNavLinks isMobile={true} onClick={handleCloseNavMenu} />
          </Menu>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
