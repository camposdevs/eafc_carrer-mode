import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { Add, SwapHoriz } from "@mui/icons-material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";

export default function Transfers() {
  const queryClient = useQueryClient();

  const [careerId, setCareerId] = useState("");
  const [form, setForm] = useState({
    player_id: "",
    type: "compra",
    origin_club: "",
    destination_club: "",
    transfer_value: "",
    transfer_date: "",
    season: "2025/26"
  });

  const { data: careers = [] } = useQuery({
    queryKey: ["careers"],
    queryFn: async () => {
      const response = await api.get("/careers");
      return response.data;
    }
  });

  const selectedCareerId = careerId || careers[0]?.id;

  const { data: players = [] } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const response = await api.get("/players");
      return response.data;
    }
  });

  const { data: transfers = [], isLoading } = useQuery({
    queryKey: ["transfers", selectedCareerId],
    enabled: Boolean(selectedCareerId),
    queryFn: async () => {
      const response = await api.get(`/transfers?career_id=${selectedCareerId}`);
      return response.data;
    }
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/transfers", {
        ...form,
        career_id: selectedCareerId,
        transfer_value: form.transfer_value ? Number(form.transfer_value) : null
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transfers", selectedCareerId] });
      setForm({
        player_id: "",
        type: "compra",
        origin_club: "",
        destination_club: "",
        transfer_value: "",
        transfer_date: "",
        season: "2025/26"
      });
    }
  });

  return (
    <Box>
      <PageHeader
        title="Transferências"
        description="Registre compras, vendas, empréstimos e retornos."
      />

      <Card sx={{ p: 2.5, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              select
              SelectProps={{ native: true }}
              fullWidth
              label="Carreira"
              value={selectedCareerId || ""}
              onChange={(event) => setCareerId(event.target.value)}
            >
              {careers.map((career) => (
                <option key={career.id} value={career.id}>
                  {career.name}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              select
              SelectProps={{ native: true }}
              fullWidth
              name="player_id"
              label="Jogador"
              value={form.player_id}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              select
              SelectProps={{ native: true }}
              fullWidth
              name="type"
              label="Tipo"
              value={form.type}
              onChange={handleChange}
            >
              <option value="compra">Compra</option>
              <option value="venda">Venda</option>
              <option value="emprestimo">Empréstimo</option>
              <option value="retorno_emprestimo">Retorno de empréstimo</option>
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="origin_club"
              label="Clube origem"
              value={form.origin_club}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="destination_club"
              label="Clube destino"
              value={form.destination_club}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              name="transfer_value"
              label="Valor"
              type="number"
              value={form.transfer_value}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              name="transfer_date"
              label="Data"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.transfer_date}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Add />}
              sx={{ height: 56 }}
              disabled={!selectedCareerId || !form.player_id}
              onClick={() => mutation.mutate()}
            >
              Registrar
            </Button>
          </Grid>
        </Grid>
      </Card>

      {!selectedCareerId ? (
        <EmptyState
          title="Nenhuma carreira"
          description="Crie uma carreira para registrar transferências."
        />
      ) : isLoading ? (
        <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
          <CircularProgress />
        </Box>
      ) : transfers.length === 0 ? (
        <EmptyState
          title="Nenhuma transferência registrada"
          description="Adicione compras, vendas e empréstimos da temporada."
        />
      ) : (
        <Grid container spacing={2.5}>
          {transfers.map((transfer) => (
            <Grid item xs={12} md={6} lg={4} key={transfer.id}>
              <Card sx={{ p: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "rgba(193,255,0,0.12)", color: "#C1FF00" }}>
                    <SwapHoriz />
                  </Avatar>

                  <Box>
                    <Typography sx={{ fontWeight: 900 }}>
                      {transfer.origin_club || "-"} → {transfer.destination_club || "-"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {transfer.transfer_date || "Sem data"}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                  <Chip label={transfer.type} color="primary" size="small" />
                  <Chip label={transfer.season || "Temporada"} size="small" />
                  <Chip
                    label={
                      transfer.transfer_value
                        ? `€ ${Number(transfer.transfer_value).toLocaleString("pt-BR")}`
                        : "Sem valor"
                    }
                    size="small"
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}