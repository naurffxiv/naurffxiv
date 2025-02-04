import { createTheme } from "@mui/material/styles";

// Shared components styling that won't change with theme
const sharedComponents = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: '#28506e',
        '& .MuiTypography-root': {
          color: '#ffffff'
        }
      }
    }
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: '#ffffff',
        color: '#000000' 
      }
    }
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        '& .MuiSvgIcon-root': {
          color: '#ffffff'
        }
      }
    }
  }
};
const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
  components: {
    ...sharedComponents
  }
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
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
  components: {
    ...sharedComponents
  }
});

export { darkTheme, lightTheme };