import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <Box sx={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 480, p: 4 }}>
        <Typography variant="h4" sx={{ color: "#C1FF00", fontWeight: 950, mb: 1 }}>Cadastro</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Crie sua conta no EA FC Career Tracker.</Typography>
        <TextField fullWidth label="Nome" sx={{ mb: 2 }} />
        <TextField fullWidth label="E-mail" sx={{ mb: 2 }} />
        <TextField fullWidth label="Senha" type="password" sx={{ mb: 3 }} />
        <Button fullWidth variant="contained">Criar conta</Button>
        <Typography sx={{ mt: 3 }} color="text.secondary">Já tem conta? <Link to="/login" style={{ color: "#C1FF00" }}>Entrar</Link></Typography>
      </Card>
    </Box>
  );
}
