import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Login";
import Painel from "../pages/Painel";
import Clientes from "../pages/Clientes";
import Planos from "../pages/Planos";
import Configuracoes from "../pages/Configuracoes";
import PageTransition from "../components/PageTransition";

export default function AppRoutes() {
  const { token } = useContext(AuthContext);
  
  // Rota privada — só permite acesso se o usuário estiver logado
  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route 
            path="/login"
            element={
              token ? <Navigate to="/painel" /> : <PageTransition><Login /></PageTransition>
            } 
          />

          <Route
            path="/painel"
            element={
              <PrivateRoute>
                  <Painel />
              </PrivateRoute>
            }
          />

          <Route
            path="/clientes"
            element={
              <PrivateRoute>
                <Clientes />
              </PrivateRoute>
            }
          />

          <Route
            path="/planos"
            element={
              <PrivateRoute>
                <Planos />
              </PrivateRoute>
            }
          />

          <Route
            path="/configuracoes"
            element={
              <PrivateRoute>
                <Configuracoes />
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to={token ? "/painel" : "/login"} />}
          />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
