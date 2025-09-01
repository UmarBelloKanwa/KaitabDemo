"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8b5cf6", // Purple from gradient
      light: "#a78bfa",
      dark: "#6d28d9",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ec4899", // Pink accent from gradient
    },
    background: {
      default: "#0d0d0fff", // Main content background
      paper: "#161618ff", // Cards and panels
    },
    text: {
      primary: "#ffffff",
      secondary: "#9ca3af",
    },
    divider: "#27272a", // Thin gray divider
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h5: {
      fontWeight: 600,
      color: "#ffffff",
    },
    h6: {
      fontWeight: 500,
      color: "#ffffff",
    },
    body1: {
      color: "#ffffff",
    },
    body2: {
      color: "#9ca3af",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#333 #1a1a1a",
          "&::-webkit-scrollbar": {
            width: 8,
            height: 8,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#333",
            borderRadius: 8,
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
          textTransform: "none",
        },
        containedPrimary: {
          background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
          "&:hover": {
            background: "linear-gradient(90deg, #a78bfa, #f472b6)",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});



export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
