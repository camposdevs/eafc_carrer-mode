import {
  Box,
  Card,
  Chip,
  CircularProgress,
  Grid,
  Typography
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";

export default function Favorites() {
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await api.get("/favorites");
      return response.data;
    }
  });

  return (
    <Box>
      <PageHeader
        title="Favoritos"
        description="Jogadores, times e carreiras marcados como favoritos."
      />

      {isLoading ? (
        <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
          <CircularProgress />
        </Box>
      ) : favorites.length === 0 ? (
        <EmptyState
          title="Nenhum favorito"
          description="Favorite carreiras, jogadores ou times para acessar rápido."
        />
      ) : (
        <Grid container spacing={2.5}>
          {favorites.map((favorite) => (
            <Grid item xs={12} md={6} lg={4} key={favorite.id}>
              <Card sx={{ p: 2.5 }}>
                <Favorite sx={{ color: "#C1FF00", mb: 2 }} />

                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  Favorito
                </Typography>

                <Chip label={favorite.type} color="primary" sx={{ mt: 2 }} />

                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Referência: {favorite.reference_id}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}