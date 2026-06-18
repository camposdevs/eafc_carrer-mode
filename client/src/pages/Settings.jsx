import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/ui/PageHeader";

export default function Settings() {
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);

  return (
    <Box>
      <PageHeader
        title="Configurações"
        description="Perfil, tema e preferências da sua conta."
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
              Perfil
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Configurações salvas localmente.
              </Alert>
            )}

            <TextField
              fullWidth
              label="Nome"
              defaultValue={user?.name || ""}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="E-mail"
              defaultValue={user?.email || ""}
              sx={{ mb: 2 }}
            />

            <Button variant="contained" onClick={() => setSuccess(true)}>
              Salvar alterações
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3, mb: 2.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
              Tema
            </Typography>

            <Typography color="text.secondary">
              Tema atual: Dark EA FC com verde neon #C1FF00.
            </Typography>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
              Segurança
            </Typography>

            <TextField
              fullWidth
              label="Nova senha"
              type="password"
              sx={{ mb: 2 }}
            />

            <Button variant="outlined">Alterar senha</Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}