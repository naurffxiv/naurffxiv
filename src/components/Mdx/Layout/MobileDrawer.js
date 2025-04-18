import { Drawer, IconButton } from "@mui/material";
import { MenuOpen } from "@mui/icons-material";
import React from "react";

function MobileDrawer({ children }) {
  const [mobileOpen, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="sticky bottom-0 z-10 flex items-center justify-end max-w-full mr-2 max-h-0 lg:hidden">
      <Drawer
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        anchor="right"
        slotProps={{ paper: { sx: { backgroundColor: "#1A3549" } } }}
      >
        {children}
      </Drawer>
      <IconButton
        sx={{
          background: "#28506E",
          ":hover": { background: "#1A3549" },
          marginBottom: "4rem",
        }}
        onClick={() => setOpen(true)}
        size="large"
      >
        <MenuOpen sx={{ color: "white" }} />
      </IconButton>
    </div>
  );
}

export default MobileDrawer;
