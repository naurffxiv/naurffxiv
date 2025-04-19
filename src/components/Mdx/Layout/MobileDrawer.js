import { Drawer, IconButton, Box } from "@mui/material";
import { MenuOpen } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
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
        <Box sx={sx.closeDrawerContainer}>
          <IconButton
            sx={sx.closeDrawer}
            size="large"
            onClick={toggleDrawer(false)}
          >
            <ClearIcon sx={{ color: "white" }} />
          </IconButton>
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
  closeDrawer: {
    ":hover": { background: "#00171fa3" },
  },
};

export default MobileDrawer;
