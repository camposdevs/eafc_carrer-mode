import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import {
  Add,
  Archive,
  ContentCopy,
  Delete,
  Favorite,
  FavoriteBorder,
  SportsSoccer
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";

export default function Careers() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: careers = [], isLoading } = useQuery({
    queryKey: ["careers"],
    queryFn: async () => {
      const response = await api.get("/careers");
      return response.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (careerId) => {
      await api.delete(`/careers/${careerId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["careers"] });
    }
  });

  const duplicateMutation = useMutation({
    mutationFn: async (careerId) => {
      const response = await api.post(`/careers/${careerId}/duplicate`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["careers"] });
    }
  });

  return (
    <Box>
      <PageHeader
        title="Minhas Carreiras"
        description="Gerencie todos os seus modos carreira salvos."
        actionLabel="Nova carreira"
        onAction={() => navigate("/careers/choose-team")}
      />

      {isLoading ? (
        <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
          <CircularProgress />
        </Box>
      ) : careers.length === 0 ? (
        <EmptyState
          title="Nenhuma carreira criada"
          description="Comece importando um clube real pela Sportmonks ou criando manualmente sua carreira."
          actionLabel="Criar primeira carreira"
          onAction={() => navigate("/careers/choose-team")}
        />
      ) : (
        <Grid container spacing={2.5}>
          {careers.map((career) => (
            <Grid item xs={12} md={6} lg={4} key={career.id}>
              <Card
                sx={{
                  p: 3,
                  height: "100%",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "rgba(193,255,0,0.35)"
                  }
                }}
                onClick={() => navigate(`/careers/${career.id}`)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 4,
                      background: "rgba(193,255,0,0.08)",
                      display: "grid",
                      placeItems: "center",
                      overflow: "hidden"
                    }}
                  >
                    {career.club_logo ? (
                      <img
                        src={career.club_logo}
                        alt={career.club_name}
                        style={{
                          width: 52,
                          height: 52,
                          objectFit: "contain"
                        }}
                      />
                    ) : (
                      <SportsSoccer sx={{ color: "#C1FF00" }} />
                    )}
                  </Box>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 900,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {career.name}
                    </Typography>

                    <Typography color="text.secondary">
                      {career.club_name}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 1, mt: 3, flexWrap: "wrap" }}>
                  <Chip
                    label={career.initial_season || "2025/26"}
                    size="small"
                    sx={{ bgcolor: "rgba(193,255,0,0.12)", color: "#C1FF00" }}
                  />
                  {career.country && <Chip label={career.country} size="small" />}
                  {career.league && <Chip label={career.league} size="small" />}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3
                  }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <IconButton color="primary">
                    {career.is_favorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>

                  <Box>
                    <IconButton
                      onClick={() => duplicateMutation.mutate(career.id)}
                    >
                      <ContentCopy />
                    </IconButton>

                    <IconButton>
                      <Archive />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => deleteMutation.mutate(career.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12} md={6} lg={4}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Add />}
              onClick={() => navigate("/careers/choose-team")}
              sx={{
                height: "100%",
                minHeight: 220,
                borderStyle: "dashed",
                borderColor: "rgba(193,255,0,0.35)"
              }}
            >
              Nova carreira
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}