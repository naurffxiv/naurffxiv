import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function ExitButton({ onClick }) {
  return (
    <IconButton sx={closeDrawer} size="large" onClick={onClick}>
      <ClearIcon sx={{ color: "white" }} />
    </IconButton>
  );
}

const closeDrawer = {
  ":hover": { background: "#00171fa3" },
};

export default ExitButton;
