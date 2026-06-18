import { Box, Button, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

export default function ErrorState({
  title = "Algo deu errado",
  description = "Não foi possível carregar os dados.",
  onRetry
}) {
  return (
    <Box
      sx={{
        minHeight: 280,
        borderRadius: 5,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.04)",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        p: 4
      }}
    >
      <Box>
        <ErrorOutline sx={{ fontSize: 48, color: "#C1FF00", mb: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          {title}
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 460 }}>
          {description}
        </Typography>

        {onRetry && (
          <Button sx={{ mt: 3 }} variant="contained" onClick={onRetry}>
            Tentar novamente
          </Button>
        )}
      </Box>
    </Box>
  );
}