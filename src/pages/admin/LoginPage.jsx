import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { User } from "lucide-react";

export const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Por favor ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      navigate("/admin/dashboard");
    } else {
      setErrorMsg("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-2xl p-8">
        <div className="flex justify-center mb-4">
          <User size={48} className="text-blue-600 bg-blue-200 p-2 rounded-full w-15 h-15" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Login Administrador
        </h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition-colors"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
          <Link 
            to="/"
            className="flex justify-center mt-2 text-blue-600 hover:underline">
            <button className="cursor-pointer">Volver al Inicio</button>
          </Link>
        </form>
      </div>
    </div>
  );
};