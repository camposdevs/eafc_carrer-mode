import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery
} from "@mui/material";
import {
  Dashboard,
  SportsSoccer,
  Groups,
  Timeline,
  SwapHoriz,
  CalendarMonth,
  EmojiEvents,
  BarChart,
  Favorite,
  Settings,
  MilitaryTech,
  FormatListNumbered
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 280;

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
  { label: "Carreiras", path: "/careers", icon: <SportsSoccer /> },
  { label: "Elenco", path: "/squad", icon: <Groups /> },
  { label: "Escalação", path: "/lineup", icon: <Timeline /> },
  { label: "Transferências", path: "/transfers", icon: <SwapHoriz /> },
  { label: "Calendário", path: "/calendar", icon: <CalendarMonth /> },
  { label: "Resultados", path: "/results", icon: <BarChart /> },
  { label: "Competições", path: "/competitions", icon: <EmojiEvents /> },
  { label: "Temporadas", path: "/seasons", icon: <MilitaryTech /> },
  { label: "Rankings", path: "/rankings", icon: <FormatListNumbered /> },
  { label: "Favoritos", path: "/favorites", icon: <Favorite /> },
  { label: "Configurações", path: "/settings", icon: <Settings /> }
];

function SidebarContent({ onClose }) {
  const location = useLocation();

  return (
    <Box
      sx={{
        height: "100%",
        background:
          "linear-gradient(180deg, rgba(18,18,18,1), rgba(10,10,10,1))",
        p: 2.5,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box sx={{ px: 1, mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            color: "#C1FF00",
            fontWeight: 900,
            letterSpacing: 1
          }}
        >
          EA FC
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#B3B3B3",
            mt: 0.5
          }}
        >
          Career Tracker
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              onClick={onClose}
              startIcon={item.icon}
              sx={{
                justifyContent: "flex-start",
                color: active ? "#0A0A0A" : "#FFFFFF",
                background: active ? "#C1FF00" : "transparent",
                py: 1.2,
                px: 1.5,
                borderRadius: 3,
                "&:hover": {
                  background: active ? "#C1FF00" : "rgba(193,255,0,0.08)",
                  color: active ? "#0A0A0A" : "#C1FF00"
                }
              }}
            >
              {item.label}
            </Button>
          );
        })}
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box
        sx={{
          p: 2,
          borderRadius: 4,
          background: "rgba(193,255,0,0.08)",
          border: "1px solid rgba(193,255,0,0.18)"
        }}
      >
        <Typography sx={{ fontWeight: 800 }}>Modo carreira vivo</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Dados salvos no Supabase e independentes da API.
        </Typography>
      </Box>
    </Box>
  );
}

export default function Sidebar({ mobileOpen, onClose }) {
  const isDesktop = useMediaQuery("(min-width:900px)");

  if (isDesktop) {
    return (
      <Box
        component="aside"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          borderRight: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        <SidebarContent />
      </Box>
    );
  }

  return (
    <Drawer
      open={mobileOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: drawerWidth,
          background: "#121212"
        }
      }}
    >
      <SidebarContent onClose={onClose} />
    </Drawer>
  );
}

export { drawerWidth };