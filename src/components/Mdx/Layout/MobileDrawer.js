import { Drawer, IconButton, Box } from "@mui/material";
import { MenuOpen } from "@mui/icons-material";
import React from "react";
import ExitButton from "@/components/Common/ExitButton";

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
        <Box sx={sx.closeDrawerContainer}>
          <ExitButton onClick={toggleDrawer(false)} />
        </Box>
        {children}
      </Drawer>
      <IconButton sx={sx.openDrawer} onClick={toggleDrawer(true)} size="large">
        <MenuOpen sx={{ color: "white" }} />
      </IconButton>
    </div>
  );
}

const sx = {
  openDrawer: {
    background: "#28506E",
    ":hover": { background: "#1A3549" },
    marginRight: "0.75rem",
    marginBottom: "5.75rem",
  },
  closeDrawerContainer: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "0.5rem",
  },
};

export default MobileDrawer;
