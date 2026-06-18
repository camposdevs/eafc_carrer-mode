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
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer
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

  const resultData = [
    {
      name: "Vitórias",
      value: summary?.total_wins || 0
    },
    {
      name: "Empates",
      value: summary?.total_draws || 0
    },
    {
      name: "Derrotas",
      value: summary?.total_losses || 0
    }
  ];

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        description="Visão geral profissional das suas carreiras."
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

        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3, height: 360 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
              Resultados
            </Typography>

            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={resultData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  <Cell fill="#C1FF00" />
                  <Cell fill="#B3B3B3" />
                  <Cell fill="#ff4d4d" />
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#121212",
                    border: "1px solid rgba(193,255,0,0.2)",
                    borderRadius: 12
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3, height: 360 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>
              Resumo de desempenho
            </Typography>

            <StatLine label="Vitórias" value={summary?.total_wins || 0} />
            <StatLine label="Empates" value={summary?.total_draws || 0} />
            <StatLine label="Derrotas" value={summary?.total_losses || 0} />
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
        mb: 2,
        borderRadius: 3,
        background: "rgba(255,255,255,0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Typography color="text.secondary">{label}</Typography>

      <Typography sx={{ fontWeight: 900, color: "#C1FF00" }}>
        {value}
      </Typography>
    </Box>
  );
}