import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ['300','400','500','700'],
  style: ['normal','italic'],
  subsets: ['latin'],
  display: 'swap',
})

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
  typography: {
    fontFamily: [
      roboto.style.fontFamily,
      '"Segoe UI"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
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
  typography: {
    fontFamily: [
      roboto.style.fontFamily,
      '"Segoe UI"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
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