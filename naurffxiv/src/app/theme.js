import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode:"dark",
    background: {
      default: "#00171F",
      paper: "#1e1e1e"
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3'
    },
    primary: {
      main: '#121212',
    }
  },

});

const lightTheme = createTheme({
  palette: {
    mode:"light",
    primary: {
      main: '#f5f5f5',
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5"
    },
    text: {
      primary: '#000000',
      secondary: '#424242'
    },
  },
});

export { darkTheme, lightTheme };