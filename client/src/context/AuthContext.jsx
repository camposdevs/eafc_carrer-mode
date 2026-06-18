import { createContext, useContext, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("@eafc:token");
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("@eafc:user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function login(email, password) {
    const response = await api.post("/auth/login", {
      email,
      password
    });

    const { token: apiToken, user: apiUser } = response.data;

    localStorage.setItem("@eafc:token", apiToken);
    localStorage.setItem("@eafc:user", JSON.stringify(apiUser));

    setToken(apiToken);
    setUser(apiUser);

    return response.data;
  }

  async function register(name, email, password) {
    const response = await api.post("/auth/register", {
      name,
      email,
      password
    });

    const { token: apiToken, user: apiUser } = response.data;

    localStorage.setItem("@eafc:token", apiToken);
    localStorage.setItem("@eafc:user", JSON.stringify(apiUser));

    setToken(apiToken);
    setUser(apiUser);

    return response.data;
  }

  function logout() {
    localStorage.removeItem("@eafc:token");
    localStorage.removeItem("@eafc:user");

    setToken(null);
    setUser(null);
  }

  const value = useMemo(() => {
    return {
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout
    };
  }, [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}