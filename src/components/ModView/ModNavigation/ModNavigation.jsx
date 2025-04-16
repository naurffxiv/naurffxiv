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
        <MenuItem>
          <PathSelectedLink text={"Notes"} href={"/mod-view/notes"} />
        </MenuItem>
        <MenuItem>
          <PathSelectedLink text={"Strikes"} href={"/mod-view/strikes"} />
        </MenuItem>
        <MenuItem>
          <PathSelectedLink
            text={"Active Exiles"}
            href={"/mod-view/active-exiles"}
          />
        </MenuItem>
        <MenuItem>
          <PathSelectedLink
            text={"Unban Appeals"}
            href={"/mod-view/unban-appeals"}
          />
        </MenuItem>

        <MenuItem disabled={true}>Account</MenuItem>
        <MenuItem>
          <PathSelectedLink text={"Settings"} href={"/mod-view/settings"} />
        </MenuItem>
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
