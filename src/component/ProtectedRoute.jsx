import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

/**
 * ProtectedRoute con Zustand
 * - Verifica si existe user en el store global
 * - Si no existe, redirige al login
 */
export const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};