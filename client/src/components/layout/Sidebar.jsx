import { Box, Button, Typography } from "@mui/material";
import { Dashboard, SportsSoccer, Groups, CalendarMonth, EmojiEvents, Settings } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const items = [
  { label: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
  { label: "Carreiras", path: "/careers", icon: <SportsSoccer /> },
  { label: "Elenco", path: "/squad", icon: <Groups /> },
  { label: "Calendário", path: "/calendar", icon: <CalendarMonth /> },
  { label: "Títulos", path: "/titles", icon: <EmojiEvents /> },
  { label: "Configurações", path: "/settings", icon: <Settings /> }
];

export default function Sidebar() {
  return (
    <Box sx={{ width: 270, height: "100vh", position: "fixed", left: 0, top: 0, p: 3, background: "#121212", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
      <Typography variant="h5" sx={{ color: "#C1FF00", fontWeight: 950, mb: 4 }}>EA FC</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {items.map((item) => (
          <Button key={item.path} component={NavLink} to={item.path} startIcon={item.icon} sx={{ justifyContent: "flex-start", color: "#fff", py: 1.2, "&.active": { color: "#C1FF00", background: "rgba(193,255,0,0.08)" }, "&:hover": { color: "#C1FF00", background: "rgba(193,255,0,0.08)" } }}>
            {item.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
