import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingScreen({ text = "Carregando..." }) {
  return (
    <Box
      sx={{
        minHeight: 320,
        display: "grid",
        placeItems: "center",
        textAlign: "center"
      }}
    >
      <Box>
        <CircularProgress />
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
}