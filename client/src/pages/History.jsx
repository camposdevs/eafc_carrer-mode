import { Box, Card, Grid, Typography } from "@mui/material";
import { EmojiEvents, Groups, SwapHoriz, Timeline } from "@mui/icons-material";
import PageHeader from "../components/ui/PageHeader";

const historyItems = [
  {
    title: "Evolução do elenco",
    description: "Acompanhe mudanças de jogadores e overall por temporada.",
    icon: <Groups />
  },
  {
    title: "Evolução de overall",
    description: "Veja quem evoluiu, caiu de rendimento ou virou estrela.",
    icon: <Timeline />
  },
  {
    title: "Histórico de transferências",
    description: "Todas as compras, vendas e empréstimos registrados.",
    icon: <SwapHoriz />
  },
  {
    title: "Histórico de títulos",
    description: "Todas as conquistas por carreira e temporada.",
    icon: <EmojiEvents />
  }
];

export default function History() {
  return (
    <Box>
      <PageHeader
        title="Histórico"
        description="Linha do tempo completa da evolução das suas carreiras."
      />

      <Grid container spacing={2.5}>
        {historyItems.map((item) => (
          <Grid item xs={12} md={6} key={item.title}>
            <Card sx={{ p: 3, height: "100%" }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  display: "grid",
                  placeItems: "center",
                  color: "#C1FF00",
                  background: "rgba(193,255,0,0.12)",
                  mb: 2
                }}
              >
                {item.icon}
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                {item.title}
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {item.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}