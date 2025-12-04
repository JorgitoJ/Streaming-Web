import { useState } from "react";
import { useServiceStore } from "../../store/useServiciosStore";

export const GetServices = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [servicio, setServicio] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const addSolicitud = useServiceStore((state) => state.addSolicitud);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");

    if (!nombre || !email || !telefono || !servicio) {
      setMensaje("Por favor completa todos los campos");
      return;
    }

    // Validación simple de email
    if (!email.includes("@")) {
      setMensaje("Correo inválido");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      addSolicitud({
        id: Date.now(), // simple ID
        nombre,
        email,
        telefono,
        servicio,
        estado: "pendiente",
        codigoAsignado: null,
      });

      setLoading(false);
      setMensaje("Solicitud enviada correctamente!");
      setNombre("");
      setEmail("");
      setTelefono("");
      setServicio("");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Solicitar Servicio</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          placeholder="Servicio deseado"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Enviando..." : "Enviar Solicitud"}
        </button>

        {mensaje && <p className="text-center text-gray-700 mt-2">{mensaje}</p>}
      </form>
    </div>
  );
};