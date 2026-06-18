import { Grid, Card, Box, Typography } from "@mui/material";
import {
  EmojiEvents,
  SportsSoccer,
  Groups,
  Timeline,
  MilitaryTech
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";

export default function Dashboard() {
  const { data: summary } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const response = await api.get("/dashboard/summary");
      return response.data;
    }
  });

  const { data: goalsByCareer = [] } = useQuery({
    queryKey: ["goals-by-career"],
    queryFn: async () => {
      const response = await api.get("/dashboard/goals-by-career");
      return response.data;
    }
  });

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        description="Visão geral das suas carreiras, gols, títulos e evolução."
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Carreiras"
            value={summary?.total_careers || 0}
            subtitle="Modos criados"
            icon={<SportsSoccer />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Temporadas"
            value={summary?.total_seasons || 0}
            subtitle="Histórico salvo"
            icon={<MilitaryTech />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Jogos"
            value={summary?.total_matches || 0}
            subtitle="Partidas registradas"
            icon={<Timeline />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Gols"
            value={summary?.total_goals || 0}
            subtitle="Total marcado"
            icon={<Groups />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Títulos"
            value={summary?.total_titles || 0}
            subtitle="Conquistas"
            icon={<EmojiEvents />}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: 380 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
              Gols por carreira
            </Typography>

            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={goalsByCareer}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="career" stroke="#B3B3B3" />
                <YAxis stroke="#B3B3B3" />
                <Tooltip
                  contentStyle={{
                    background: "#121212",
                    border: "1px solid rgba(193,255,0,0.2)",
                    borderRadius: 12
                  }}
                />
                <Bar dataKey="goals" fill="#C1FF00" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: 380 }}>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              Aproveitamento
            </Typography>

            <Box sx={{ mt: 4, display: "grid", gap: 2 }}>
              <StatLine label="Vitórias" value={summary?.total_wins || 0} />
              <StatLine label="Empates" value={summary?.total_draws || 0} />
              <StatLine label="Derrotas" value={summary?.total_losses || 0} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function StatLine({ label, value }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        background: "rgba(255,255,255,0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Typography color="text.secondary">{label}</Typography>
      <Typography sx={{ fontWeight: 900, color: "#C1FF00" }}>{value}</Typography>
    </Box>
  );
}