import { Routes, Route } from "react-router-dom";

// Layouts
import { PublicLayout } from "../layout/PublicLayout";
import { AdminLayout } from "../layout/AdminLayout";

// Public pages
import { HomePage } from "../pages/public/HomePage.jsx";
import { FindCodePage } from "../pages/public/FindCodePage.jsx";
import { ActivationStatusPage } from "../pages/public/ActivationStatusPage.jsx";
import { GetServices } from "../pages/public/GetServices.jsx";

// Admin pages
import { LoginPage } from "../pages/admin/LoginPage.jsx";
import { DashboardPage } from "../pages/admin/DashboardPage.jsx";
import { PendingActivationPage } from "../pages/admin/PendingActivationPage.jsx";
import {CodesAdmin} from "../pages/admin/InputCode.jsx";
import { ClientPage } from "../pages/admin/ClientsPage.jsx";
import { MailboxConfigPage } from "../pages/admin/MailboxConfigPage.jsx";
import { CodesList } from "../pages/admin/CodeList.jsx";

// Protected Route
import { ProtectedRoute } from "../component/ProtectedRoute.jsx";

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/buscar-codigo" element={<FindCodePage />} />
        <Route path="/activacion" element={<ActivationStatusPage />} />
        <Route path="/servicio" element={<GetServices/>} />
      </Route>

      {/* Login administrador */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas admin protegidas */}
      <Route element={<AdminLayout />}>
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/activaciones"
          element={
            <ProtectedRoute>
              <PendingActivationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/clients"
          element={
            <ProtectedRoute>
              <ClientPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/correo"
          element={
            <ProtectedRoute>
              <MailboxConfigPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/codes"
          element={
            <ProtectedRoute>
              <CodesAdmin />
            </ProtectedRoute>
          }
        />

       <Route
          path="/admin/codelist"
          element={
            <ProtectedRoute>
              <CodesList />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
}