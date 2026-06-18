import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Dashboard from "../pages/Dashboard";
import Careers from "../pages/Careers";
import CreateCareer from "../pages/CreateCareer";
import ChooseTeam from "../pages/ChooseTeam";
import CareerDetails from "../pages/CareerDetails";
import Squad from "../pages/Squad";
import Lineup from "../pages/Lineup";
import Statistics from "../pages/Statistics";
import Transfers from "../pages/Transfers";
import Calendar from "../pages/Calendar";
import Results from "../pages/Results";
import Competitions from "../pages/Competitions";
import Seasons from "../pages/Seasons";
import History from "../pages/History";
import Rankings from "../pages/Rankings";
import Favorites from "../pages/Favorites";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

function PrivatePage({ children }) {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/recuperar-senha" element={<ForgotPassword />} />

      <Route
        path="/dashboard"
        element={
          <PrivatePage>
            <Dashboard />
          </PrivatePage>
        }
      />

      <Route
        path="/careers"
        element={
          <PrivatePage>
            <Careers />
          </PrivatePage>
        }
      />

      <Route
        path="/careers/new"
        element={
          <PrivatePage>
            <CreateCareer />
          </PrivatePage>
        }
      />

      <Route
        path="/careers/choose-team"
        element={
          <PrivatePage>
            <ChooseTeam />
          </PrivatePage>
        }
      />

      <Route
        path="/careers/:id"
        element={
          <PrivatePage>
            <CareerDetails />
          </PrivatePage>
        }
      />

      <Route
        path="/squad"
        element={
          <PrivatePage>
            <Squad />
          </PrivatePage>
        }
      />

      <Route
        path="/lineup"
        element={
          <PrivatePage>
            <Lineup />
          </PrivatePage>
        }
      />

      <Route
        path="/statistics"
        element={
          <PrivatePage>
            <Statistics />
          </PrivatePage>
        }
      />

      <Route
        path="/transfers"
        element={
          <PrivatePage>
            <Transfers />
          </PrivatePage>
        }
      />

      <Route
        path="/calendar"
        element={
          <PrivatePage>
            <Calendar />
          </PrivatePage>
        }
      />

      <Route
        path="/results"
        element={
          <PrivatePage>
            <Results />
          </PrivatePage>
        }
      />

      <Route
        path="/competitions"
        element={
          <PrivatePage>
            <Competitions />
          </PrivatePage>
        }
      />

      <Route
        path="/seasons"
        element={
          <PrivatePage>
            <Seasons />
          </PrivatePage>
        }
      />

      <Route
        path="/history"
        element={
          <PrivatePage>
            <History />
          </PrivatePage>
        }
      />

      <Route
        path="/rankings"
        element={
          <PrivatePage>
            <Rankings />
          </PrivatePage>
        }
      />

      <Route
        path="/favorites"
        element={
          <PrivatePage>
            <Favorites />
          </PrivatePage>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivatePage>
            <Settings />
          </PrivatePage>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}