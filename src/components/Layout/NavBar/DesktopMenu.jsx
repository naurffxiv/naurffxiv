import { MenuList } from "@mui/material";
import SharedNavLinks from "./SharedNavLinks";

/**
 * Desktop variant of the header navbar menu
 * */
export function DesktopMenu() {
  return (
    <MenuList sx={{ display: "flex" }}>
      <SharedNavLinks isMobile={false} />
    </MenuList>
  );
}
