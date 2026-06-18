import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import { useState } from "react";

export default function Statistics() {
  const [seasonId, setSeasonId] = useState("");

  const { data: careers = [] } = useQuery({
    queryKey: ["careers"],
    queryFn: async () => {
      const response = await api.get("/careers");
      return response.data;
    }
  });

  const selectedCareerId = careers[0]?.id;

  const { data: seasons = [] } = useQuery({
    queryKey: ["seasons", selectedCareerId],
    enabled: Boolean(selectedCareerId),
    queryFn: async () => {
      const response = await api.get(`/seasons?career_id=${selectedCareerId}`);
      return response.data;
    }
  });

  const selectedSeasonId = seasonId || seasons[0]?.id;

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["player-stats", selectedSeasonId],
    enabled: Boolean(selectedSeasonId),
    queryFn: async () => {
      const response = await api.get(`/stats/players?season_id=${selectedSeasonId}`);
      return response.data;
    }
  });

  return (
    <Box>
      <PageHeader
        title="Estatísticas"
        description="Gols, assistências, partidas, cartões, clean sheets e minutos."
      />

      <Card sx={{ p: 2.5, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              SelectProps={{ native: true }}
              fullWidth
              label="Temporada"
              value={selectedSeasonId || ""}
              onChange={(event) => setSeasonId(event.target.value)}
            >
              {seasons.map((season) => (
                <option key={season.id} value={season.id}>
                  {season.season_name}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Card>

      {!selectedSeasonId ? (
        <EmptyState
          title="Nenhuma temporada selecionada"
          description="Crie uma temporada para cadastrar estatísticas."
        />
      ) : isLoading ? (
        <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
          <CircularProgress />
        </Box>
      ) : stats.length === 0 ? (
        <EmptyState
          title="Sem estatísticas ainda"
          description="Cadastre estatísticas dos jogadores pelo backend ou próximas telas."
        />
      ) : (
        <Grid container spacing={2}>
          {stats.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <Card sx={{ p: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar src={item.players?.photo}>
                    {item.players?.name?.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography sx={{ fontWeight: 900 }}>
                      {item.players?.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.players?.position || "Sem posição"}
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={1.5} sx={{ mt: 2 }}>
                  <MiniStat label="Gols" value={item.goals} />
                  <MiniStat label="Assist." value={item.assists} />
                  <MiniStat label="Jogos" value={item.matches} />
                  <MiniStat label="Nota" value={item.average_rating || "-"} />
                  <MiniStat label="CA" value={item.yellow_cards} />
                  <MiniStat label="CV" value={item.red_cards} />
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

function MiniStat({ label, value }) {
  return (
    <Grid item xs={4}>
      <Box
        sx={{
          p: 1.5,
          borderRadius: 3,
          background: "rgba(255,255,255,0.04)",
          textAlign: "center"
        }}
      >
        <Typography sx={{ color: "#C1FF00", fontWeight: 900 }}>
          {value ?? 0}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Grid>
  );
}