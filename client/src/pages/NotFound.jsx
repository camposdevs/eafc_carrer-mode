import { Box, Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#0A0A0A",
        display: "grid",
        placeItems: "center",
        p: 2
      }}
    >
      <Card sx={{ p: 4, maxWidth: 520, textAlign: "center" }}>
        <Typography variant="h2" sx={{ color: "#C1FF00", fontWeight: 900 }}>
          404
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 900, mt: 1 }}>
          Página não encontrada
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          Essa rota não existe no EA FC Career Tracker.
        </Typography>

        <Button variant="contained" onClick={() => navigate("/dashboard")}>
          Voltar ao dashboard
        </Button>
      </Card>
    </Box>
  );
}