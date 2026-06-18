import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { Save, SportsScore } from "@mui/icons-material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";

export default function Results() {
  const queryClient = useQueryClient();

  const [careerId, setCareerId] = useState("");
  const [editing, setEditing] = useState({});

  const { data: careers = [] } = useQuery({
    queryKey: ["careers"],
    queryFn: async () => {
      const response = await api.get("/careers");
      return response.data;
    }
  });

  const selectedCareerId = careerId || careers[0]?.id;

  const { data: matches = [], isLoading } = useQuery({
    queryKey: ["matches", selectedCareerId],
    enabled: Boolean(selectedCareerId),
    queryFn: async () => {
      const response = await api.get(`/matches?career_id=${selectedCareerId}`);
      return response.data;
    }
  });

  function updateLocal(matchId, field, value) {
    setEditing({
      ...editing,
      [matchId]: {
        ...editing[matchId],
        [field]: value
      }
    });
  }

  const mutation = useMutation({
    mutationFn: async ({ matchId, payload }) => {
      const response = await api.put(`/matches/${matchId}`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches", selectedCareerId] });
    }
  });

  function saveResult(match) {
    const local = editing[match.id] || {};

    const goalsFor = Number(local.goals_for ?? match.goals_for ?? 0);
    const goalsAgainst = Number(local.goals_against ?? match.goals_against ?? 0);

    let result = "D";
    if (goalsFor > goalsAgainst) result = "W";
    if (goalsFor < goalsAgainst) result = "L";

    mutation.mutate({
      matchId: match.id,
      payload: {
        goals_for: goalsFor,
        goals_against: goalsAgainst,
        result
      }
    });
  }

  return (
    <Box>
      <PageHeader
        title="Resultados"
        description="Atualize placares e resultados das partidas."
      />

      <Card sx={{ p: 2.5, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              select
              SelectProps={{ native: true }}
              fullWidth
              label="Carreira"
              value={selectedCareerId || ""}
              onChange={(event) => setCareerId(event.target.value)}
            >
              {careers.map((career) => (
                <option key={career.id} value={career.id}>
                  {career.name}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Card>

      {!selectedCareerId ? (
        <EmptyState title="Nenhuma carreira" description="Crie uma carreira primeiro." />
      ) : isLoading ? (
        <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
          <CircularProgress />
        </Box>
      ) : matches.length === 0 ? (
        <EmptyState
          title="Nenhuma partida"
          description="Cadastre partidas no calendário para lançar resultados."
        />
      ) : (
        <Grid container spacing={2.5}>
          {matches.map((match) => {
            const local = editing[match.id] || {};

            return (
              <Grid item xs={12} md={6} lg={4} key={match.id}>
                <Card sx={{ p: 2.5 }}>
                  <SportsScore sx={{ color: "#C1FF00", mb: 2 }} />

                  <Typography variant="h6" sx={{ fontWeight: 900 }}>
                    {match.club_name || "Seu time"} x {match.opponent}
                  </Typography>

                  <Typography color="text.secondary">
                    {match.competition_name || "Sem competição"} •{" "}
                    {match.match_date || "Sem data"}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Chip
                      label={
                        match.result === "W"
                          ? "Vitória"
                          : match.result === "L"
                          ? "Derrota"
                          : match.result === "D"
                          ? "Empate"
                          : "Pendente"
                      }
                      color={match.result === "W" ? "primary" : "default"}
                    />
                  </Box>

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Gols pró"
                        type="number"
                        value={local.goals_for ?? match.goals_for ?? 0}
                        onChange={(event) =>
                          updateLocal(match.id, "goals_for", event.target.value)
                        }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Gols contra"
                        type="number"
                        value={local.goals_against ?? match.goals_against ?? 0}
                        onChange={(event) =>
                          updateLocal(
                            match.id,
                            "goals_against",
                            event.target.value
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Save />}
                        onClick={() => saveResult(match)}
                      >
                        Salvar resultado
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}