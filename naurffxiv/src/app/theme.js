import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#28506e",
        },
      },
    },
  },
});

export default theme;
