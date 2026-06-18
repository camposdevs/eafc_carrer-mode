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
import { Add, CalendarMonth } from "@mui/icons-material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";

export default function Calendar() {
  const queryClient = useQueryClient();

  const [careerId, setCareerId] = useState("");
  const [form, setForm] = useState({
    competition_name: "",
    opponent: "",
    match_date: "",
    home_away: "casa",
    stadium: ""
  });

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

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/matches", {
        ...form,
        career_id: selectedCareerId
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches", selectedCareerId] });
      setForm({
        competition_name: "",
        opponent: "",
        match_date: "",
        home_away: "casa",
        stadium: ""
      });
    }
  });

  return (
    <Box>
      <PageHeader
        title="Calendário"
        description="Cadastre partidas futuras ou jogos da temporada."
      />

      <Card sx={{ p: 2.5, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
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

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="competition_name"
              label="Competição"
              value={form.competition_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="opponent"
              label="Adversário"
              value={form.opponent}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="match_date"
              label="Data"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.match_date}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              select
              SelectProps={{ native: true }}
              fullWidth
              name="home_away"
              label="Casa/Fora"
              value={form.home_away}
              onChange={handleChange}
            >
              <option value="casa">Casa</option>
              <option value="fora">Fora</option>
              <option value="neutro">Neutro</option>
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="stadium"
              label="Estádio"
              value={form.stadium}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Add />}
              sx={{ height: 56 }}
              disabled={!selectedCareerId || !form.opponent}
              onClick={() => mutation.mutate()}
            >
              Adicionar
            </Button>
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
          title="Nenhuma partida cadastrada"
          description="Adicione jogos no calendário da temporada."
        />
      ) : (
        <Grid container spacing={2.5}>
          {matches.map((match) => (
            <Grid item xs={12} md={6} lg={4} key={match.id}>
              <Card sx={{ p: 2.5 }}>
                <CalendarMonth sx={{ color: "#C1FF00", mb: 2 }} />

                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  vs {match.opponent}
                </Typography>

                <Typography color="text.secondary">
                  {match.competition_name || "Sem competição"}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                  <Chip label={match.match_date || "Sem data"} size="small" />
                  <Chip label={match.home_away || "-"} color="primary" size="small" />
                  <Chip label={match.stadium || "Sem estádio"} size="small" />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}