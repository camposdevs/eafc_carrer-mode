import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { FormatListNumbered } from "@mui/icons-material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";

export default function Rankings() {
  const [careerId, setCareerId] = useState("");
  const [field, setField] = useState("goals");

  const { data: careers = [] } = useQuery({
    queryKey: ["careers"],
    queryFn: async () => {
      const response = await api.get("/careers");
      return response.data;
    }
  });

  const selectedCareerId = careerId || careers[0]?.id;

  const { data: ranking = [], isLoading } = useQuery({
    queryKey: ["ranking", selectedCareerId, field],
    enabled: Boolean(selectedCareerId),
    queryFn: async () => {
      const endpoint =
        field === "market_value"
          ? `/rankings/market-value?career_id=${selectedCareerId}`
          : `/rankings/players?career_id=${selectedCareerId}&field=${field}`;

      const response = await api.get(endpoint);
      return response.data;
    }
  });

  return (
    <Box>
      <PageHeader
        title="Rankings"
        description="Artilheiros, assistências, partidas, clean sheets e valor de mercado."
      />

      <Card sx={{ p: 2.5, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
            <TextField
              select
              SelectProps={{ native: true }}
              fullWidth
              label="Ranking"
              value={field}
              onChange={(event) => setField(event.target.value)}
            >
              <option value="goals">Artilheiros</option>
              <option value="assists">Assistências</option>
              <option value="matches">Partidas</option>
              <option value="clean_sheets">Clean Sheets</option>
              <option value="minutes_played">Minutos jogados</option>
              <option value="market_value">Valor de mercado</option>
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
      ) : ranking.length === 0 ? (
        <EmptyState
          title="Sem dados para ranking"
          description="Cadastre estatísticas ou jogadores para montar os rankings."
        />
      ) : (
        <Grid container spacing={2}>
          {ranking.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={`${item.player_id}-${item.position}`}>
              <Card sx={{ p: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 3,
                      background: "#C1FF00",
                      color: "#0A0A0A",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 900
                    }}
                  >
                    #{item.position}
                  </Box>

                  <Avatar src={item.player_photo}>
                    {item.player_name?.charAt(0)}
                  </Avatar>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 900 }}>
                      {item.player_name || "Jogador"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.player_position || "Sem posição"}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <Typography color="text.secondary">Valor</Typography>
                  <Typography sx={{ color: "#C1FF00", fontWeight: 900 }}>
                    {field === "market_value"
                      ? `€ ${Number(item.value || 0).toLocaleString("pt-BR")}`
                      : item.value || 0}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}