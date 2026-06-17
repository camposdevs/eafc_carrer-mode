import { useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("demo@eafc.com");
  const [password, setPassword] = useState("123456");

  function handleSubmit(event) {
    event.preventDefault();
    login({ token: "demo-local-token", user: { id: 1, name: "Demo", email } });
    navigate("/dashboard");
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "radial-gradient(circle at top right, rgba(193,255,0,0.18), transparent 34%), #0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 450, p: 4 }}>
        <Typography variant="h4" sx={{ color: "#C1FF00", fontWeight: 950, mb: 1 }}>EA FC</Typography>
        <Typography variant="h5" fontWeight={900}>Entrar</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Acesse suas carreiras salvas.</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="E-mail" type="email" sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="Senha" type="password" sx={{ mb: 3 }} value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button fullWidth type="submit" variant="contained">Entrar</Button>
        </Box>
        <Typography sx={{ mt: 3 }} color="text.secondary">Não tem conta? <Link to="/cadastro" style={{ color: "#C1FF00" }}>Criar conta</Link></Typography>
        <Typography sx={{ mt: 1 }}><Link to="/recuperar-senha" style={{ color: "#B3B3B3" }}>Esqueci minha senha</Link></Typography>
      </Card>
    </Box>
  );
}
