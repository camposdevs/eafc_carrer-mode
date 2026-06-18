import { Card, Box, Typography } from "@mui/material";

export default function StatCard({ title, value, icon, subtitle }) {
  return (
    <Card
      sx={{
        p: 3,
        height: "100%",
        background:
          "linear-gradient(135deg, rgba(193,255,0,0.10), rgba(18,18,18,1) 45%)"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Box>
          <Typography color="text.secondary" variant="body2">
            {title}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              mt: 1,
              fontWeight: 900,
              color: "#FFFFFF"
            }}
          >
            {value}
          </Typography>

          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            display: "grid",
            placeItems: "center",
            color: "#C1FF00",
            background: "rgba(193,255,0,0.12)"
          }}
        >
          {icon}
        </Box>
      </Box>
    </Card>
  );
}