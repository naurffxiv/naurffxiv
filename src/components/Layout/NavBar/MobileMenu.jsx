"use client";

import { useState } from "react";
import { IconButton, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SharedNavLinks from "./SharedNavLinks";

/**
 * Mobile (thin screen) variant of the header navbar menu
 * */
export function MobileMenu() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const open = Boolean(anchorElNav);

  const handleClick = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="open mobile menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Menu
        disableScrollLock
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        sx={sx.menuContainer}
      >
        <SharedNavLinks isMobile={true} onClick={handleClose} />
      </Menu>
    </>
  );
}

const sx = {
  menuContainer: {
    display: { xs: "block", md: "none" },
    "& .MuiMenuItem-root": {
      justifyContent: "flex-end", // Right aligns the menu items
    },
  },
};
