import { Box, Button, Typography } from "@mui/material";
import { SportsSoccer } from "@mui/icons-material";

export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <Box
      sx={{
        minHeight: 280,
        borderRadius: 5,
        border: "1px dashed rgba(193,255,0,0.28)",
        background: "rgba(193,255,0,0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 4
      }}
    >
      <Box>
        <SportsSoccer sx={{ fontSize: 48, color: "#C1FF00", mb: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          {title}
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 460 }}>
          {description}
        </Typography>

        {actionLabel && (
          <Button sx={{ mt: 3 }} variant="contained" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
}