import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", background: "#0A0A0A" }}>
      <Typography variant="h3" sx={{ color: "#C1FF00", fontWeight: 950 }}>404</Typography>
      <Typography sx={{ mb: 3 }}>Página não encontrada.</Typography>
      <Button component={Link} to="/dashboard" variant="contained">Voltar</Button>
    </Box>
  );
}
