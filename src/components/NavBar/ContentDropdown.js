import * as React from "react";
import {
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Collapse,
  List,
  ListItem,
} from "@mui/material";
import { getMenuProps } from "@/app/constants.js";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ContentDropdown(props) {
  const { name, isMobile, insideMobileMenu, data } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (isMobile && insideMobileMenu) {
      // Toggle the mobile dropdown
      setMobileOpen(!mobileOpen);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuProps = getMenuProps(anchorEl, open, handleClose, isMobile);

  // For mobile menu inside hamburger menu
  if (isMobile && insideMobileMenu) {
    return (
      <Box sx={{ width: "100%" }}>
        <Box
          onClick={handleClick}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            cursor: "pointer",
          }}
        >
          <Typography>{name}</Typography>
          {mobileOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Box>
        <Collapse in={mobileOpen} timeout="auto">
          <List sx={{ pl: 2, my: 0 }}>
            {data.map((fight, i) => (
              <ListItem
                key={i}
                disablePadding
                sx={{
                  display: "block",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Box
                  component="a"
                  href={fight.url}
                  sx={{
                    py: 0.5,
                    px: 1,
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                    borderRadius: "4px",
                  }}
                >
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    {fight.title}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>
    );
  }

  // For mobile dropdown outside hamburger menu
  if (isMobile) {
    return (
      <>
        <Typography
          onClick={handleClick}
          sx={{ width: "100%", textAlign: "right" }}
        >
          {name}
          <ArrowDropDownIcon />
        </Typography>
        <Menu {...menuProps}>
          {data.map((fight, i) => (
            <li key={i}>
              <MenuItem
                onClick={handleClose}
                sx={{ justifyContent: "flex-start" }}
                component="a"
                href={fight.url}
              >
                <Typography sx={{ textAlign: "left" }}>
                  {fight.title}
                </Typography>
              </MenuItem>
            </li>
          ))}
        </Menu>
      </>
    );
  }

  // Regular desktop dropdown
  return (
    <>
      <Button
        style={{ color: "white", textTransform: "none" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}
        >
          <Typography sx={{ textAlign: "center" }}>{name}</Typography>
          <ArrowDropDownIcon
            viewBox="2 4 15 15"
            sx={{ marginY: "auto", fontSize: "15px" }}
          />
        </Typography>
      </Button>
      <Menu {...menuProps}>
        {data.map((fight, i) => (
          <li key={i}>
            <MenuItem
              onClick={handleClose}
              sx={{ justifyContent: "flex-start" }}
              component="a"
              href={fight.url}
            >
              <Typography sx={{ textAlign: "left" }}>{fight.title}</Typography>
            </MenuItem>
          </li>
        ))}
      </Menu>
    </>
  );
}
