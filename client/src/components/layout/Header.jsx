import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery
} from "@mui/material";
import { Logout, Menu, SportsSoccer } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const isDesktop = useMediaQuery("(min-width:900px)");

  return (
    <Box
      component="header"
      sx={{
        height: 78,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: {
          xs: 2,
          md: 4
        },
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(10,10,10,0.82)",
        backdropFilter: "blur(18px)",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {!isDesktop && (
          <IconButton onClick={onMenuClick}>
            <Menu />
          </IconButton>
        )}

        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 3,
            display: "grid",
            placeItems: "center",
            background: "rgba(193,255,0,0.12)",
            color: "#C1FF00"
          }}
        >
          <SportsSoccer />
        </Box>

        <Box>
          <Typography sx={{ fontWeight: 900 }}>EA FC Career Tracker</Typography>
          <Typography variant="body2" color="text.secondary">
            Dashboard profissional do modo carreira
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          sx={{
            bgcolor: "#C1FF00",
            color: "#0A0A0A",
            fontWeight: 900
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </Avatar>

        {isDesktop && (
          <Box>
            <Typography sx={{ fontWeight: 800, lineHeight: 1 }}>
              {user?.name || "Usuário"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        )}

        <Button
          variant="outlined"
          color="primary"
          startIcon={<Logout />}
          onClick={logout}
          sx={{
            display: {
              xs: "none",
              sm: "inline-flex"
            }
          }}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
}