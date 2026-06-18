import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Grid,
  Typography
} from "@mui/material";
import {
  CalendarMonth,
  Groups,
  SportsSoccer,
  SwapHoriz,
  Timeline
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";

export default function CareerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: career, isLoading } = useQuery({
    queryKey: ["career", id],
    queryFn: async () => {
      const response = await api.get(`/careers/${id}`);
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: 360 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title={career?.name}
        description="Resumo completo da carreira selecionada."
      />

      <Card sx={{ p: { xs: 2.5, md: 4 }, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: {
              xs: "flex-start",
              sm: "center"
            },
            flexDirection: {
              xs: "column",
              sm: "row"
            },
            gap: 3
          }}
        >
          <Avatar
            src={career?.club_logo}
            sx={{
              width: 96,
              height: 96,
              bgcolor: "rgba(193,255,0,0.12)"
            }}
          >
            <SportsSoccer sx={{ fontSize: 44 }} />
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              {career?.club_name}
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              {career?.league || "Liga não informada"} •{" "}
              {career?.country || "País não informado"}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
              <Chip
                label={career?.initial_season || "2025/26"}
                sx={{ bgcolor: "rgba(193,255,0,0.12)", color: "#C1FF00" }}
              />

              {career?.is_favorite && <Chip label="Favorita" color="primary" />}
              {career?.is_archived && <Chip label="Arquivada" />}
            </Box>
          </Box>

          <Button variant="contained" onClick={() => navigate("/squad")}>
            Ver elenco
          </Button>
        </Box>
      </Card>

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Temporada inicial"
            value={career?.initial_season || "-"}
            subtitle="Primeira temporada"
            icon={<CalendarMonth />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Elenco"
            value="0"
            subtitle="Jogadores salvos"
            icon={<Groups />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Jogos"
            value="0"
            subtitle="Partidas registradas"
            icon={<Timeline />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Transferências"
            value="0"
            subtitle="Mercado da carreira"
            icon={<SwapHoriz />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}