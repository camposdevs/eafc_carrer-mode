import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <Box sx={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 440, p: 4 }}>
        <Typography variant="h4" sx={{ color: "#C1FF00", fontWeight: 950, mb: 1 }}>Recuperar senha</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Informe seu e-mail para recuperar o acesso.</Typography>
        <TextField fullWidth label="E-mail" type="email" sx={{ mb: 3 }} />
        <Button fullWidth variant="contained">Enviar recuperação</Button>
        <Typography sx={{ mt: 3 }}><Link to="/login" style={{ color: "#C1FF00" }}>Voltar ao login</Link></Typography>
      </Card>
    </Box>
  );
}
