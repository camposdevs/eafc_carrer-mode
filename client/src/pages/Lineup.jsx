import { Box, Card, Grid, TextField, Typography } from "@mui/material";
import PageHeader from "../components/ui/PageHeader";

const positions433 = [
  "GK",
  "LB",
  "CB",
  "CB",
  "RB",
  "CM",
  "CM",
  "CAM",
  "LW",
  "ST",
  "RW"
];

export default function Lineup() {
  return (
    <Box>
      <PageHeader
        title="Escalação"
        description="Monte sua formação titular, reservas, capitão e batedores."
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              p: 3,
              minHeight: 620,
              background:
                "linear-gradient(180deg, rgba(193,255,0,0.12), rgba(18,18,18,1))"
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>
              Formação 4-3-3
            </Typography>

            <Box
              sx={{
                minHeight: 520,
                borderRadius: 5,
                border: "1px solid rgba(193,255,0,0.25)",
                background:
                  "linear-gradient(180deg, rgba(10,80,30,0.28), rgba(10,10,10,0.55))",
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(3, 1fr)",
                  sm: "repeat(4, 1fr)"
                },
                gap: 2,
                p: 3
              }}
            >
              {positions433.map((position, index) => (
                <PlayerSlot key={`${position}-${index}`} position={position} />
              ))}
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, mb: 2.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
              Configurações
            </Typography>

            <TextField
              select
              SelectProps={{ native: true }}
              fullWidth
              label="Formação"
              defaultValue="4-3-3"
              sx={{ mb: 2 }}
            >
              <option value="4-3-3">4-3-3</option>
              <option value="4-4-2">4-4-2</option>
              <option value="4-2-3-1">4-2-3-1</option>
              <option value="3-5-2">3-5-2</option>
              <option value="5-3-2">5-3-2</option>
              <option value="custom">Personalizada</option>
            </TextField>

            <TextField fullWidth label="Capitão" sx={{ mb: 2 }} />
            <TextField fullWidth label="Batedor de faltas" sx={{ mb: 2 }} />
            <TextField fullWidth label="Batedor de pênaltis" sx={{ mb: 2 }} />
            <TextField fullWidth label="Batedor de escanteios" />
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
              Reservas
            </Typography>

            <Typography color="text.secondary">
              Na próxima melhoria, vamos conectar esta tela ao elenco da carreira
              e salvar a escalação por temporada.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function PlayerSlot({ position }) {
  return (
    <Box
      sx={{
        minHeight: 84,
        borderRadius: 4,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.38)",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        p: 1.5
      }}
    >
      <Typography sx={{ color: "#C1FF00", fontWeight: 900 }}>
        {position}
      </Typography>

      <Typography variant="caption" color="text.secondary">
        Selecionar jogador
      </Typography>
    </Box>
  );
}