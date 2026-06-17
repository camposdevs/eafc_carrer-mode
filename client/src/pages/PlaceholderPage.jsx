import { Card, Typography } from "@mui/material";

export default function PlaceholderPage({ title }) {
  return (
    <Card sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={950} sx={{ color: "#C1FF00", mb: 1 }}>{title}</Typography>
      <Typography color="text.secondary">Tela reservada para as próximas etapas do projeto.</Typography>
    </Card>
  );
}
