"use client";

import { MenuItem, MenuList, Typography } from "@mui/material";

import { PathSelectedLink } from "./PathSelectedLink";

/**
 * Mod Portal navigation bar
 * */
export function ModNavigation() {
  return (
    <div>
      <Typography fontWeight={"bold"} fontSize={"18pt"}>
        NAUR Mod Portal
      </Typography>

      <MenuList sx={sx.menuList}>
        <MenuItem disabled={true}>Main</MenuItem>
        <PathSelectedLink href={"/mod-portal/notes"}>
          <MenuItem>Notes</MenuItem>
        </PathSelectedLink>
        <PathSelectedLink href={"/mod-portal/strikes"}>
          <MenuItem>Strikes</MenuItem>
        </PathSelectedLink>
        <PathSelectedLink href={"/mod-portal/active-exiles"}>
          <MenuItem>Active Exiles</MenuItem>
        </PathSelectedLink>
        <PathSelectedLink href={"/mod-portal/unban-appeals"}>
          <MenuItem>Unban Appeals</MenuItem>
        </PathSelectedLink>

        <MenuItem disabled={true}>Account</MenuItem>
        <PathSelectedLink href={"/mod-portal/settings"}>
          <MenuItem>Settings</MenuItem>
        </PathSelectedLink>
        <MenuItem>Log Out</MenuItem>
      </MenuList>
    </div>
  );
}

const sx = {
  menuList: {
    width: "200px",
  },
};
