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

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await register(form.name, form.email, form.password);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <Card sx={{ width: "100%", maxWidth: 460, p: { xs: 3, sm: 4 } }}>
        <Typography variant="h4" sx={{ color: "#C1FF00", fontWeight: 900 }}>
          Criar conta
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          Crie seu perfil e comece uma nova carreira.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="name"
            label="Nome"
            sx={{ mb: 2 }}
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            name="email"
            label="E-mail"
            type="email"
            sx={{ mb: 2 }}
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            name="password"
            label="Senha"
            type="password"
            sx={{ mb: 3 }}
            value={form.password}
            onChange={handleChange}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ height: 48 }}
          >
            {loading ? <CircularProgress size={22} /> : "Cadastrar"}
          </Button>
        </Box>

        <Typography color="text.secondary" sx={{ mt: 3 }}>
          Já tem conta?{" "}
          <Link to="/login" style={{ color: "#C1FF00", fontWeight: 800 }}>
            Entrar
          </Link>
        </Typography>
      </Card>
    </AuthLayout>
  );
}