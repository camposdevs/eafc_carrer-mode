import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#C1FF00", contrastText: "#0A0A0A" },
    background: { default: "#0A0A0A", paper: "#121212" },
    text: { primary: "#FFFFFF", secondary: "#B3B3B3" },
    divider: "rgba(255,255,255,0.08)"
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    button: { textTransform: "none", fontWeight: 800 }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#121212",
          border: "1px solid rgba(193,255,0,0.12)"
        }
      }
    },
    MuiButton: {
      styleOverrides: { root: { borderRadius: 12 } }
    }
  }
});

export default theme;
