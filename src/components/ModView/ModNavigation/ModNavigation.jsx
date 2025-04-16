"use client";
import { MenuItem, MenuList, Typography } from "@mui/material";

import { PathSelectedLink } from "./PathSelectedLink";

/**
 * Mod View navigation bar
 * */
export function ModNavigation() {
  return (
    <div>
      <Typography fontWeight={"bold"} fontSize={"18pt"}>
        NAUR Mod View
      </Typography>

      <MenuList sx={sx.menuList}>
        <MenuItem disabled={true}>Main</MenuItem>
        <PathSelectedLink href={"/mod-view/notes"}>
          <MenuItem>Notes</MenuItem>
        </PathSelectedLink>
        <PathSelectedLink href={"/mod-view/strikes"}>
          <MenuItem>Strikes</MenuItem>
        </PathSelectedLink>
        <PathSelectedLink href={"/mod-view/active-exiles"}>
          <MenuItem>Active Exiles</MenuItem>
        </PathSelectedLink>
        <PathSelectedLink href={"/mod-view/unban-appeals"}>
          <MenuItem>Unban Appeals</MenuItem>
        </PathSelectedLink>

        <MenuItem disabled={true}>Account</MenuItem>
        <PathSelectedLink href={"/mod-view/settings"}>
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
