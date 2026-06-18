import { Box, Typography, Button } from "@mui/material";

export default function PageHeader({ title, description, actionLabel, onAction }) {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        alignItems: {
          xs: "flex-start",
          sm: "center"
        },
        justifyContent: "space-between",
        flexDirection: {
          xs: "column",
          sm: "row"
        },
        gap: 2
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          {title}
        </Typography>

        {description && (
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Box>

      {actionLabel && (
        <Button variant="contained" color="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}