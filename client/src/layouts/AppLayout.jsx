import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar, { drawerWidth } from "../components/layout/Sidebar";

export default function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width:900px)");

  return (
    <Box sx={{ minHeight: "100vh", background: "#0A0A0A" }}>
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        sx={{
          minHeight: "100vh",
          ml: isDesktop ? `${drawerWidth}px` : 0
        }}
      >
        <Header onMenuClick={() => setMobileOpen(true)} />

        <Box
          component="main"
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4
            }
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}