import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";

export default function CreateCareer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    club_name: "",
    club_logo: "",
    country: "",
    league: "",
    initial_season: "2025/26"
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/careers", form);
      return response.data;
    },
    onSuccess: (career) => {
      queryClient.invalidateQueries({ queryKey: ["careers"] });
      navigate(`/careers/${career.id}`);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Erro ao criar carreira.");
    }
  });

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    mutation.mutate();
  }

  return (
    <Box>
      <PageHeader
        title="Criar Carreira Manual"
        description="Cadastre uma carreira sem importar dados da Sportmonks."
      />

      <Card sx={{ p: { xs: 2.5, md: 4 } }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="name"
                label="Nome da carreira"
                value={form.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="club_name"
                label="Clube"
                value={form.club_name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="club_logo"
                label="URL do escudo"
                value={form.club_logo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                name="country"
                label="País"
                value={form.country}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                name="league"
                label="Liga"
                value={form.league}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="initial_season"
                label="Temporada inicial"
                value={form.initial_season}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <CircularProgress size={22} />
                  ) : (
                    "Criar carreira"
                  )}
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate("/careers/choose-team")}
                >
                  Importar pela Sportmonks
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}