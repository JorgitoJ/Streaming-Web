import { Outlet, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const AdminLayout = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold">Acceso restringido</h1>
        <p className="text-gray-600 mt-2">
          Debes iniciar sesión para acceder al panel.
        </p>
        <Link className="text-blue-600 underline mt-4 inline-block" to="/login">
          Ir al Login
        </Link>
      </div>
    );
  }

  const handleLogout =()=>{
    logout();
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        {/* TÍTULO */}
        <h2 className="text-xl font-bold mb-4">Panel Admin</h2>

        {/* MENÚ */}
        <nav className="flex flex-col space-y-2 flex-1">
          <Link className="hover:text-blue-600" to="/admin/dashboard">
            Dashboard
          </Link>
          <Link className="hover:text-blue-600" to="/admin/activaciones">
            Activaciones Pendientes
          </Link>
          <Link className="hover:text-blue-600" to="/admin/clients">
            Clientes
          </Link>
          <Link className="hover:text-blue-600" to="/admin/correo">
            Config Buzón
          </Link>
          <Link className="hover:text-blue-600" to="/admin/accounts">
            Listado de Cuentas
          </Link>
          <Link className="hover:text-blue-600" to="/admin/addaccounts">
            Añadir Cuentas
          </Link>
          <Link className="hover:text-blue-600" to="/admin/assingaccounts">
            Asignar Cuentas
          </Link>
        </nav>

        {/* USUARIO AL FONDO */}
        <div className="border-t pt-4 mt-4">
          <p className="text-gray-700 font-medium">{user?.name || user?.email}</p>
          <button
            onClick={handleLogout}
            className="mt-1 bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-800"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};