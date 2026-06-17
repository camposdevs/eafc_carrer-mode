import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import PlaceholderPage from "../pages/PlaceholderPage";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

function PrivatePage({ children }) {
  return <ProtectedRoute><MainLayout>{children}</MainLayout></ProtectedRoute>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/recuperar-senha" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<PrivatePage><Dashboard /></PrivatePage>} />
      <Route path="/careers" element={<PrivatePage><PlaceholderPage title="Minhas Carreiras" /></PrivatePage>} />
      <Route path="/squad" element={<PrivatePage><PlaceholderPage title="Elenco" /></PrivatePage>} />
      <Route path="/calendar" element={<PrivatePage><PlaceholderPage title="Calendário" /></PrivatePage>} />
      <Route path="/titles" element={<PrivatePage><PlaceholderPage title="Títulos" /></PrivatePage>} />
      <Route path="/settings" element={<PrivatePage><PlaceholderPage title="Configurações" /></PrivatePage>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
