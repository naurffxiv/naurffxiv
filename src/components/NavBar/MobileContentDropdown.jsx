import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";

/**
 * Mobile (thin screen) version of content dropdown menu
 * For mobile dropdown outside hamburger menu
 * NOTE: unused, part of the original ContentDropdown code
 * */
export function MobileContentDropdown({ data, name }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Typography onClick={handleClick} sx={sx.root}>
        {name}
        <ArrowDropDownIcon />
      </Typography>
      <Menu
        id={"basic-menu"}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={sx.menu}
      >
        {data.map((fight, i) => (
          <li key={i}>
            <MenuItem
              onClick={handleClose}
              sx={sx.menuItem}
              component="a"
              href={fight.url}
            >
              <Typography sx={sx.menuItemText}>{fight.title}</Typography>
            </MenuItem>
          </li>
        ))}
      </Menu>
    </>
  );

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
}

const sx = {
  root: {
    width: "100%",
    textAlign: "right",
  },
  menu: {
    "& .MuiMenu-paper": {
      width: 200,
    },
    "& .MuiMenuItem-root": {
      justifyContent: "flex-end",
      padding: "8px 16px",
      "& a": {
        width: "100%",
        textAlign: "right",
        whiteSpace: "normal",
        wordBreak: "break-word",
        lineHeight: "1.4",
        display: "block",
        paddingLeft: "8px",
      },
    },
  },
  menuItem: {
    justifyContent: "flex-start",
  },
  menuItemText: {
    textAlign: "left",
  },
};
