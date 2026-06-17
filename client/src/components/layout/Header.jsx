import { Box, Button, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <Box sx={{ ml: "270px", height: 76, px: 4, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#0A0A0A" }}>
      <Box>
        <Typography variant="h6" fontWeight={900}>EA FC Career Tracker</Typography>
        <Typography variant="body2" color="text.secondary">Gerencie suas carreiras do EA FC/FIFA</Typography>
      </Box>
      <Button variant="outlined" color="primary" startIcon={<Logout />} onClick={logout}>Sair {user?.name ? `- ${user.name}` : ""}</Button>
    </Box>
  );
}
