import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <Card sx={{ width: "100%", maxWidth: 460, p: { xs: 3, sm: 4 } }}>
        <Typography variant="h4" sx={{ color: "#C1FF00", fontWeight: 900 }}>
          Recuperar senha
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          Informe seu e-mail para iniciar a recuperação.
        </Typography>

        <Box component="form">
          <TextField fullWidth label="E-mail" type="email" sx={{ mb: 3 }} />

          <Button fullWidth variant="contained" sx={{ height: 48 }}>
            Enviar instruções
          </Button>
        </Box>

        <Typography color="text.secondary" sx={{ mt: 3 }}>
          Lembrou a senha?{" "}
          <Link to="/login" style={{ color: "#C1FF00", fontWeight: 800 }}>
            Entrar
          </Link>
        </Typography>
      </Card>
    </AuthLayout>
  );
}