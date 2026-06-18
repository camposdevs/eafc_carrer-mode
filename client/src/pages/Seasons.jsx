import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { Add, MilitaryTech } from "@mui/icons-material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";

export default function Seasons() {
  const queryClient = useQueryClient();

  const [careerId, setCareerId] = useState("");
  const [seasonName, setSeasonName] = useState("2025/26");

  const { data: careers = [] } = useQuery({
    queryKey: ["careers"],
    queryFn: async () => {
      const response = await api.get("/careers");
      return response.data;
    }
  });

  const selectedCareerId = careerId || careers[0]?.id;

  const { data: seasons = [], isLoading } = useQuery({
    queryKey: ["seasons", selectedCareerId],
    enabled: Boolean(selectedCareerId),
    queryFn: async () => {
      const response = await api.get(`/seasons?career_id=${selectedCareerId}`);
      return response.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/seasons", {
        career_id: selectedCareerId,
        season_name: seasonName
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasons", selectedCareerId] });
      setSeasonName("");
    }
  });

  return (
    <Box>
      <PageHeader
        title="Temporadas"
        description="Gerencie as temporadas de cada carreira."
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

          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Nova temporada"
              value={seasonName}
              onChange={(event) => setSeasonName(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Add />}
              sx={{ height: 56 }}
              disabled={!selectedCareerId || !seasonName}
              onClick={() => mutation.mutate()}
            >
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </Card>

      {!selectedCareerId ? (
        <EmptyState
          title="Nenhuma carreira"
          description="Crie uma carreira para adicionar temporadas."
        />
      ) : isLoading ? (
        <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
          <CircularProgress />
        </Box>
      ) : seasons.length === 0 ? (
        <EmptyState
          title="Nenhuma temporada cadastrada"
          description="Adicione temporadas como 2025/26, 2026/27 e acompanhe a evolução."
        />
      ) : (
        <Grid container spacing={2.5}>
          {seasons.map((season) => (
            <Grid item xs={12} sm={6} md={4} key={season.id}>
              <Card sx={{ p: 3 }}>
                <MilitaryTech sx={{ color: "#C1FF00", mb: 2 }} />

                <Typography variant="h5" sx={{ fontWeight: 900 }}>
                  {season.season_name}
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Temporada salva no modo carreira.
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}