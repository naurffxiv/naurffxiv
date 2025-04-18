import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Collapse, List, ListItem, Typography } from "@mui/material";
import React, { useState } from "react";

/**
 * Mobile (thin screen) version of content accordion
 * For mobile accordion inside hamburger menu
 * */
export function MobileContentAccordion({ data, name }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={sx.root}>
      <Box onClick={handleClick} sx={sx.nameContainer}>
        <Typography>{name}</Typography>
        {mobileOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Box>
      <Collapse in={mobileOpen} timeout="auto">
        <List sx={sx.dropdownList}>
          {data.map((fight, i) => (
            <ListItem key={i} disablePadding sx={sx.dropdownItemContainer}>
              <Box component="a" href={fight.url} sx={sx.dropdownItem}>
                <Typography sx={sx.dropdownItemText}>{fight.title}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
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
  dropdownList: {
    pl: 2,
    my: 0,
  },
  dropdownItemContainer: {
    display: "block",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  dropdownItem: {
    py: 0.5,
    px: 1,
    display: "block",
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
    borderRadius: "4px",
  },
  dropdownItemText: {
    fontSize: "0.9rem",
  },
};
