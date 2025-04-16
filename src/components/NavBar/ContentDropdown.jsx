import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Typography, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

/**
 * Desktop version of content dropdown menu
 * For desktop dropdown outside hamburger menu
 * */
export function ContentDropdown({ data, name }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={sx.button}
        onClick={handleClick}
      >
        <Typography variant="h6" sx={sx.nameContainer}>
          <Typography sx={sx.nameText}>{name}</Typography>
          <ArrowDropDownIcon viewBox="2 4 15 15" sx={sx.dropdownIcon} />
        </Typography>
      </Button>
      <Menu
        id={"basic-menu"}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        {data.map((fight, i) => (
          <li key={i}>
            <MenuItem
              onClick={handleClose}
              sx={sx.dropdownItemContainer}
              component="a"
              href={fight.url}
            >
              <Typography sx={sx.dropdownItemText}>{fight.title}</Typography>
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
  button: {
    color: "white",
    textTransform: "none",
  },
  nameContainer: {
    flexGrow: 1,
    display: { xs: "flex", md: "flex" },
  },
  nameText: {
    textAlign: "center",
  },
  dropdownIcon: {
    marginY: "auto",
    fontSize: "15px",
  },
  dropdownItemContainer: {
    justifyContent: "flex-start",
  },
  dropdownItemText: {
    textAlign: "left",
  },
};
