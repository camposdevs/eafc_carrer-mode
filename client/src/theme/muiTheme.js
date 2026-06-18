import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0A0A0A",
      paper: "#121212"
    },
    primary: {
      main: "#C1FF00",
      contrastText: "#0A0A0A"
    },
    secondary: {
      main: "#B3B3B3"
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3"
    },
    divider: "rgba(255,255,255,0.08)"
  },
  shape: {
    borderRadius: 18
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    h1: {
      fontWeight: 900
    },
    h2: {
      fontWeight: 900
    },
    h3: {
      fontWeight: 800
    },
    h4: {
      fontWeight: 800
    },
    h5: {
      fontWeight: 800
    },
    h6: {
      fontWeight: 800
    },
    button: {
      fontWeight: 800,
      textTransform: "none"
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#121212",
          border: "1px solid rgba(193,255,0,0.10)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: "10px 18px"
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined"
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 14,
            backgroundColor: "rgba(255,255,255,0.03)"
          }
        }
      }
    }
  }
});