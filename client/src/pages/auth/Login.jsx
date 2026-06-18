import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login(email, password);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <Card sx={{ width: "100%", maxWidth: 460, p: { xs: 3, sm: 4 } }}>
        <Typography variant="h4" sx={{ color: "#C1FF00", fontWeight: 900 }}>
          Entrar
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          Acesse suas carreiras salvas do EA FC.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="E-mail"
            type="email"
            sx={{ mb: 2 }}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextField
            fullWidth
            label="Senha"
            type="password"
            sx={{ mb: 2 }}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 3
            }}
          >
            <Link to="/recuperar-senha" style={{ color: "#C1FF00" }}>
              Esqueci minha senha
            </Link>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ height: 48 }}
          >
            {loading ? <CircularProgress size={22} /> : "Entrar"}
          </Button>
        </Box>

        <Typography color="text.secondary" sx={{ mt: 3 }}>
          Não tem conta?{" "}
          <Link to="/cadastro" style={{ color: "#C1FF00", fontWeight: 800 }}>
            Criar conta
          </Link>
        </Typography>
      </Card>
    </AuthLayout>
  );
}