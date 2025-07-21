import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { extremeList, savageList, ultimateList } from "@/config/constants";

import MenuIcon from "@mui/icons-material/Menu";
import { MobileContentAccordion } from "@/components/Layout/NavBar/MobileContentAccordion";
import { useState } from "react";

/**
 * Mobile (thin screen) variant of the header navbar menu
 * */
export function MobileMenu() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  return (
    <>
      <IconButton
        size="large"
        aria-label="icon-button"
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
        open={Boolean(anchorElNav)}
        onClose={handleClose}
        sx={sx.menuContainer}
      >
        <li>
          <MenuItem onClick={handleClose} component="a" href="/">
            <Typography sx={sx.text}>Home</Typography>
          </MenuItem>
        </li>
        <Box sx={sx.text}>
          <MobileContentAccordion name="Ultimate" data={ultimateList} />
        </Box>
        <Box sx={sx.text}>
          <MobileContentAccordion name="Savage" data={savageList} />
        </Box>
        <Box sx={sx.text}>
          <MobileContentAccordion name="Extreme" data={extremeList} />
        </Box>
        {/*To add when internal pages are created*/}
        {/*{pages.map((page) => (*/}
        {/*    <li key={page.name}>*/}
        {/*        <MenuItem onClick={handleCloseNavMenu} component="a" href={page.link}>*/}
        {/*            <Typography sx={sx.text}>*/}
        {/*                {page.name}*/}
        {/*            </Typography>*/}
        {/*        </MenuItem>*/}
        {/*    </li>*/}
        {/*))}*/}
      </Menu>
    </>
  );

  function handleClick(event) {
    setAnchorElNav(event.currentTarget);
  }

  function handleClose() {
    setAnchorElNav(null);
  }
}

const sx = {
  menuContainer: {
    display: { xs: "block", md: "none" },
    "& .MuiMenuItem-root": {
      justifyContent: "flex-end", // Right aligns the menu items
    },
  },
  text: {
    textAlign: "left",
    width: "100%",
  },
};
