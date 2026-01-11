import type { Appearance } from "@stripe/stripe-js";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff00aaff", // Purple from gradient
      light: "#f7258eff",
      dark: "#ff009dff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ec4899", // Pink accent from gradient
    },
    background: {
      default: "#000000ff", // Main content background
      paper: "#161618ff", // Cards and panels
    },
    text: {
      primary: "#ffffff",
      secondary: "#9ca3af",
    },
    divider: "#27272a", // Thin gray divider
  },
  typography: {
    fontFamily: `"Plus Jakarta Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
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
  custom: {
    gradient: {
      primary: "linear-gradient(90deg, #8a5cf644, #ec4899)",
      primaryHover: "linear-gradient(90deg, #a78bfa, #f472b6)",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          m: 0,
          p: 0,
          boxSizing: "border-box",
          // Custom scrollbar styles
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
        root: ({theme}) => ({
          borderRadius: 12,
          fontWeight: 500,
          textTransform: "none",
          "&.elevated": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            border: "1px solid " + theme.palette.divider,
            boxShadow: theme.shadows[1],   // elevation
            textTransform: "none",
            "&:hover": {
              boxShadow: theme.shadows[8],
              backgroundColor: theme.palette.background.paper,
            },
          }
        }),
        containedPrimary: ({ theme }) => ({
          background: theme.custom.gradient.primary,
          "&:hover": {
            background: theme.custom.gradient.primaryHover,
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          fontWeight: 500,
          textTransform: "none",

          // Custom class style
          "&.gradientChip": {
            background: theme.custom.gradient.primary,
            color: theme.palette.primary.contrastText,
            fontWeight: 600,
            "&:hover": {
              background: theme.custom.gradient.primaryHover,
            },
          },
        }),
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

// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#8b5cf6",
//       light: "#a78bfa",
//       dark: "#6d28d9",
//       contrastText: "#ffffff",
//     },
//     secondary: {
//       main: "#ec4899",
//     },
//     background: {
//       default: "#0d0d0f",
//       paper: "#161618",
//     },
//     text: {
//       primary: "#ffffff",
//       secondary: "#9ca3af",
//     },
//     divider: "#27272a",
//   },
//   typography: {
//     fontFamily: `"Plus Jakarta Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
//     h1: {
//       fontWeight: 700,
//       fontSize: "2.5rem",
//       lineHeight: 1.2,
//       letterSpacing: "-0.5px",
//       color: "#fff",
//     },
//     h2: {
//       fontWeight: 600,
//       fontSize: "2rem",
//       lineHeight: 1.3,
//       letterSpacing: "-0.3px",
//       color: "#fff",
//     },
//     h3: {
//       fontWeight: 600,
//       fontSize: "1.75rem",
//       lineHeight: 1.35,
//       letterSpacing: "-0.2px",
//       color: "#fff",
//     },
//     h4: {
//       fontWeight: 500,
//       fontSize: "1.5rem",
//       lineHeight: 1.4,
//       letterSpacing: "-0.1px",
//       color: "#fff",
//     },
//     body1: {
//       fontWeight: 400,
//       fontSize: "1rem",
//       lineHeight: 1.65,
//       letterSpacing: "0.3px", // Added spacing for readability
//       color: "#fff",
//     },
//     body2: {
//       fontWeight: 400,
//       fontSize: "0.875rem",
//       lineHeight: 1.6,
//       letterSpacing: "0.2px",
//       color: "#9ca3af",
//     },
//     subtitle1: {
//       fontWeight: 500,
//       fontSize: "0.95rem",
//       lineHeight: 1.5,
//       letterSpacing: "0.2px",
//     },
//     button: {
//       textTransform: "none",
//       fontWeight: 600,
//       fontSize: "0.95rem",
//       letterSpacing: "0.3px",
//     },
//     caption: {
//       fontSize: "0.8rem",
//       letterSpacing: "0.4px",
//       lineHeight: 1.4,
//     },
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           m: 0,
//           p: 0,
//           boxSizing: "border-box",
//           // Custom scrollbar styles
//           scrollbarColor: "#333 #1a1a1a",
//           "&::-webkit-scrollbar": {
//             width: 3,
//             height: 3,
//           },
//           "&::-webkit-scrollbar-thumb": {
//             backgroundColor: "#333",
//             borderRadius: 8,
//           },
//         },
//       },
//     },
//   }
// });

export default theme;


export const appearance: Appearance = {
    theme: "night",
    variables: {
      colorPrimary: "#ff00aa",
      colorBackground: "#000000",
      colorText: "#ffffff",
      colorTextSecondary: "#9ca3af",
      colorDanger: "#ef4444",

      fontFamily:
        '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, sans-serif',
      borderRadius: "12px",
      spacingUnit: "6px",
    },

    rules: {
      ".Input": {
        backgroundColor: "#000000",
        border: "1px solid #27272a",
        boxShadow: "none",
        color: "#ffffff",
      },

      ".Input:focus": {
        border: "1px solid #ff00aa",
        boxShadow: "0 0 0 1px rgba(255,0,170,0.4)",
      },

      ".Label": {
        color: "#9ca3af",
        fontSize: "13px",
        fontWeight: "500",
      },

      ".Tab": {
        borderRadius: "12px",
        border: "1px solid #27272a",
        backgroundColor: "#000000",
        color: "#9ca3af",
      },

      ".Tab--selected": {
        backgroundColor: "#161618",
        color: "#ffffff",
        border: "1px solid #ff00aa",
      },

      ".Block": {
        backgroundColor: "#000000",
        borderRadius: "12px",
        padding: "16px",
      },

      ".Error": {
        color: "#ef4444",
        fontSize: "13px",
      },
    },
  };
