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
import { Add, EmojiEvents } from "@mui/icons-material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";

export default function Competitions() {
  const queryClient = useQueryClient();

  const [careerId, setCareerId] = useState("");
  const [form, setForm] = useState({
    name: "",
    type: "Liga",
    season: "2025/26",
    stage: "",
    final_position: "",
    champion: ""
  });

  const { data: careers = [] } = useQuery({
    queryKey: ["careers"],
    queryFn: async () => {
      const response = await api.get("/careers");
      return response.data;
    }
  });

  const selectedCareerId = careerId || careers[0]?.id;

  const { data: competitions = [], isLoading } = useQuery({
    queryKey: ["competitions", selectedCareerId],
    enabled: Boolean(selectedCareerId),
    queryFn: async () => {
      const response = await api.get(
        `/competitions?career_id=${selectedCareerId}`
      );
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
      const response = await api.post("/competitions", {
        ...form,
        career_id: selectedCareerId
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["competitions", selectedCareerId]
      });

      setForm({
        name: "",
        type: "Liga",
        season: "2025/26",
        stage: "",
        final_position: "",
        champion: ""
      });
    }
  });

  return (
    <Box>
      <PageHeader
        title="Competições"
        description="Gerencie ligas, copas, continentais, mundiais e supercopas."
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
              name="name"
              label="Nome"
              value={form.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              select
              SelectProps={{ native: true }}
              fullWidth
              name="type"
              label="Tipo"
              value={form.type}
              onChange={handleChange}
            >
              <option value="Liga">Liga</option>
              <option value="Copa">Copa</option>
              <option value="Continental">Continental</option>
              <option value="Mundial">Mundial</option>
              <option value="Supercopa">Supercopa</option>
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="season"
              label="Temporada"
              value={form.season}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="stage"
              label="Fase"
              value={form.stage}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="final_position"
              label="Colocação"
              value={form.final_position}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="champion"
              label="Campeão"
              value={form.champion}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<Add />}
              disabled={!selectedCareerId || !form.name}
              onClick={() => mutation.mutate()}
            >
              Adicionar competição
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
      ) : competitions.length === 0 ? (
        <EmptyState
          title="Nenhuma competição cadastrada"
          description="Adicione as competições disputadas na temporada."
        />
      ) : (
        <Grid container spacing={2.5}>
          {competitions.map((competition) => (
            <Grid item xs={12} md={6} lg={4} key={competition.id}>
              <Card sx={{ p: 2.5 }}>
                <EmojiEvents sx={{ color: "#C1FF00", mb: 2 }} />

                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  {competition.name}
                </Typography>

                <Typography color="text.secondary">
                  {competition.season || "Sem temporada"}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                  <Chip label={competition.type || "Tipo"} color="primary" size="small" />
                  <Chip label={competition.stage || "Fase"} size="small" />
                  <Chip
                    label={competition.final_position || "Sem colocação"}
                    size="small"
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}