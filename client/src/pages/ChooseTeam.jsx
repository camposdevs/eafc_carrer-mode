import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import { Search, SportsSoccer } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";

export default function ChooseTeam() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [query, setQuery] = useState("");
  const [teams, setTeams] = useState([]);
  const [careerName, setCareerName] = useState("");
  const [initialSeason, setInitialSeason] = useState("2025/26");
  const [error, setError] = useState("");

  async function handleSearch(event) {
    event.preventDefault();

    if (!query.trim()) return;

    try {
      setError("");
      const response = await api.get(
        `/sportmonks/teams/search?query=${encodeURIComponent(query)}`
      );
      setTeams(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao buscar times.");
    }
  }

  const importMutation = useMutation({
    mutationFn: async (team) => {
      const response = await api.post("/sportmonks/careers/import", {
        career_name: careerName || `Carreira ${team.name}`,
        initial_season: initialSeason,
        team
      });

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["careers"] });
      navigate(`/careers/${data.career.id}`);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Erro ao importar carreira.");
    }
  });

  return (
    <Box>
      <PageHeader
        title="Escolher Time"
        description="Pesquise um clube real e importe a base inicial pela Sportmonks."
        actionLabel="Criar manualmente"
        onAction={() => navigate("/careers/new")}
      />

      <Card sx={{ p: { xs: 2.5, md: 4 }, mb: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSearch}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Pesquisar clube"
                placeholder="Ex: Corinthians, Real Madrid, Barcelona"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Nome da carreira"
                placeholder="Ex: Corinthians 2025"
                value={careerName}
                onChange={(event) => setCareerName(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Temporada"
                value={initialSeason}
                onChange={(event) => setInitialSeason(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={1}>
              <Button fullWidth type="submit" variant="contained" sx={{ height: 56 }}>
                Buscar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>

      {teams.length === 0 ? (
        <EmptyState
          title="Pesquise um clube"
          description="Digite o nome de um time para importar dados iniciais como escudo, país, estádio e elenco."
        />
      ) : (
        <Grid container spacing={2.5}>
          {teams.map((team) => (
            <Grid item xs={12} md={6} lg={4} key={team.sportmonks_id}>
              <Card
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={team.logo}
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: "rgba(193,255,0,0.1)"
                    }}
                  >
                    <SportsSoccer />
                  </Avatar>

                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                      {team.name}
                    </Typography>

                    <Typography color="text.secondary">
                      {team.country || "País não informado"}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Cidade
                  </Typography>
                  <Typography>{team.city || "Não informado"}</Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Estádio
                  </Typography>
                  <Typography>{team.stadium || "Não informado"}</Typography>
                </Box>

                <Box sx={{ flex: 1 }} />

                <Button
                  variant="contained"
                  disabled={importMutation.isPending}
                  onClick={() => importMutation.mutate(team)}
                >
                  {importMutation.isPending ? (
                    <CircularProgress size={22} />
                  ) : (
                    "Importar carreira"
                  )}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}