import {
  Avatar,
  Box,
  Card,
  Chip,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";

export default function Squad() {
  const [search, setSearch] = useState("");

  const { data: players = [], isLoading } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const response = await api.get("/players");
      return response.data;
    }
  });

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const term = search.toLowerCase();

      return (
        player.name?.toLowerCase().includes(term) ||
        player.position?.toLowerCase().includes(term) ||
        player.nationality?.toLowerCase().includes(term)
      );
    });
  }, [players, search]);

  return (
    <Box>
      <PageHeader
        title="Elenco"
        description="Lista de jogadores cadastrados/importados para suas carreiras."
      />

      <Card sx={{ p: 2.5, mb: 3 }}>
        <TextField
          fullWidth
          label="Pesquisar jogador"
          placeholder="Nome, posição ou nacionalidade"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </Card>

      {isLoading ? (
        <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
          <CircularProgress />
        </Box>
      ) : filteredPlayers.length === 0 ? (
        <EmptyState
          title="Nenhum jogador encontrado"
          description="Importe uma carreira pela Sportmonks ou cadastre jogadores manualmente."
        />
      ) : (
        <Grid container spacing={2.5}>
          {filteredPlayers.map((player) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
              <Card
                sx={{
                  p: 2.5,
                  height: "100%",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "rgba(193,255,0,0.35)"
                  }
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={player.photo}
                    sx={{
                      width: 62,
                      height: 62,
                      bgcolor: "rgba(193,255,0,0.12)"
                    }}
                  >
                    {player.name?.charAt(0)}
                  </Avatar>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {player.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {player.nationality || "Nacionalidade não informada"}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                  <Chip
                    size="small"
                    label={player.position || "POS"}
                    sx={{ bgcolor: "rgba(193,255,0,0.12)", color: "#C1FF00" }}
                  />

                  <Chip
                    size="small"
                    label={`OVR ${player.overall_current || "-"}`}
                  />

                  <Chip
                    size="small"
                    label={`${player.age || "-"} anos`}
                  />
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.04)"
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Valor de mercado
                  </Typography>

                  <Typography sx={{ fontWeight: 900 }}>
                    {player.market_value
                      ? `€ ${Number(player.market_value).toLocaleString("pt-BR")}`
                      : "Não informado"}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}