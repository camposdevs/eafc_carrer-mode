import { Box, Typography } from "@mui/material";

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(193,255,0,0.18), transparent 35%), radial-gradient(circle at bottom left, rgba(193,255,0,0.08), transparent 30%), #0A0A0A",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1.1fr 0.9fr"
        }
      }}
    >
      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex"
          },
          flexDirection: "column",
          justifyContent: "space-between",
          p: 6,
          borderRight: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              color: "#C1FF00",
              fontWeight: 900,
              letterSpacing: 1
            }}
          >
            EA FC
          </Typography>

          <Typography variant="h4" sx={{ mt: 2, maxWidth: 560 }}>
            Controle total das suas carreiras em um painel profissional.
          </Typography>

          <Typography
            sx={{
              color: "#B3B3B3",
              mt: 2,
              maxWidth: 520,
              lineHeight: 1.8
            }}
          >
            Importe clubes, gerencie elenco, temporadas, transferências,
            estatísticas, títulos e rankings em uma experiência inspirada no EA
            FC Ultimate Team.
          </Typography>
        </Box>

        <Typography color="text.secondary">
          EA FC Career Tracker • Modo Carreira organizado de verdade
        </Typography>
      </Box>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: {
            xs: 2,
            sm: 4
          }
        }}
      >
        {children}
      </Box>
    </Box>
  );
}