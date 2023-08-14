// theme.js
import { createTheme } from "@mui/material/styles";

// Light mode theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#FF5722",
    },
  },
});

// Dark mode theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF5722",
    },
    secondary: {
      main: "#1976D2",
    },
    background: {
      default: "#121212", // Dark background color for dark mode
      paper: "#1e1e1e", // Dark surface color for dark mode
    },
  },
});
