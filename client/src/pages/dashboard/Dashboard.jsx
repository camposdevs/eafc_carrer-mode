import { Card, Grid, Typography, Box } from "@mui/material";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const stats = [
  { label: "Carreiras", value: 0 },
  { label: "Temporadas", value: 0 },
  { label: "Jogos", value: 0 },
  { label: "Títulos", value: 0 },
  { label: "Gols", value: 0 }
];

const data = [
  { season: "2025/26", goals: 0 },
  { season: "2026/27", goals: 0 },
  { season: "2027/28", goals: 0 },
  { season: "2028/29", goals: 0 }
];

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={950} sx={{ mb: 1 }}>Dashboard</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>Resumo geral das suas carreiras.</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((item) => (
          <Grid item xs={12} sm={6} md={2.4} key={item.label}>
            <Card sx={{ p: 3 }}>
              <Typography color="text.secondary">{item.label}</Typography>
              <Typography variant="h3" sx={{ color: "#C1FF00", fontWeight: 950 }}>{item.value}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Card sx={{ p: 3, height: 360 }}>
        <Typography variant="h6" fontWeight={900} sx={{ mb: 2 }}>Gols por temporada</Typography>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={data}>
            <XAxis dataKey="season" stroke="#B3B3B3" />
            <YAxis stroke="#B3B3B3" />
            <Tooltip />
            <Area type="monotone" dataKey="goals" stroke="#C1FF00" fill="#C1FF00" fillOpacity={0.15} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </Box>
  );
}
