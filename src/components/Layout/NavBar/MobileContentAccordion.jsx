import { Box, Collapse, Typography, MenuList, MenuItem } from "@mui/material";
import React, { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

/**
 * Mobile (thin screen) version of content accordion
 * For mobile accordion inside hamburger menu
 * */
export function MobileContentAccordion({ data, name }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={sx.root}>
      <MenuItem onClick={handleClick}>
        <Box sx={sx.nameContainer}>
          <Typography>{name}</Typography>
          {mobileOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Box>
      </MenuItem>
      <Collapse in={mobileOpen} timeout="auto">
        <MenuList>
          {data.map((fight, i) => (
            <MenuItem
              component="a"
              href={fight.url}
              key={i}
              disablePadding
              sx={sx.dropdownItemContainer}
            >
              <Box sx={sx.dropdownItem}>
                <Typography>{fight.title}</Typography>
              </Box>
            </MenuItem>
          ))}
        </MenuList>
      </Collapse>
    </Box>
  );

  function handleClick() {
    setMobileOpen(!mobileOpen);
  }
}

const sx = {
  root: {
    width: "100%",
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    cursor: "pointer",
  },
  dropdownItemContainer: {
    display: "block",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  dropdownItem: {
    py: 0.5,
    px: 1,
    display: "block",
    textDecoration: "none",
    color: "inherit",
  },
  dropdownItemText: {
    fontSize: "0.9rem",
  },
};
