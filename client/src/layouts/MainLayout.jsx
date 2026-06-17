import { Box } from "@mui/material";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function MainLayout({ children }) {
  return (
    <Box sx={{ minHeight: "100vh", background: "#0A0A0A" }}>
      <Sidebar />
      <Header />
      <Box component="main" sx={{ ml: "270px", p: 4 }}>{children}</Box>
    </Box>
  );
}
