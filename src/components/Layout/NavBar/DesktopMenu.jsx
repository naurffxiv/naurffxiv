import { MenuItem, MenuList, Typography } from "@mui/material";
import { extremeList, savageList, ultimateList } from "@/config/constants";

import { ContentDropdown } from "./ContentDropdown";

/**
 * Desktop variant of the header navbar menu
 * */
export function DesktopMenu() {
  return (
    <MenuList sx={sx.root}>
      <ContentDropdown name="Ultimate" data={ultimateList} />
      <ContentDropdown name="Savage" data={savageList} />
      <ContentDropdown name="Extreme" data={extremeList} />

      {/*To add when internal pages are created*/}
      {/*{pages.map((page) => (*/}
      {/*    <li key={page.name}>*/}
      {/*        <MenuItem component="a" href={page.link} sx={sx.menuItem}>*/}
      {/*            <Typography sx={sx.menuItemText}>*/}
      {/*                {page.name}*/}
      {/*            </Typography>*/}
      {/*        </MenuItem>*/}
      {/*    </li>*/}
      {/*))}*/}

      <li>
        <MenuItem
          component="a"
          href="https://findingway.io"
          target="_blank"
          rel="noopener noreferrer"
          sx={sx.menuItem}
        >
          <Typography variant="h7" component="div" sx={sx.menuItemText}>
            Findingway
          </Typography>
        </MenuItem>
      </li>
    </MenuList>
  );
}

const sx = {
  root: {
    display: "flex",
  },
  menuItem: {
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.04)",
    },
  },
  menuItemText: {
    textAlign: "center",
  },
};
