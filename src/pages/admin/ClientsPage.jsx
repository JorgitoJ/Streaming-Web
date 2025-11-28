import { useState } from "react";
import { useServiciosStore } from "../../store/useServiciosStore";
import { useCodesStore } from "../../store/usecodesStore";

export const ClientPage = () => {
  const solicitudes = useServiciosStore((state) => state.solicitudes);
  const updateSolicitud = useServiciosStore((state) => state.updateSolicitud);
  const addCode = useCodesStore((state) => state.addCode);

  const [codigoInput, setCodigoInput] = useState({}); // código temporal por solicitud

  const handleAsignarCodigo = (solicitud) => {
    if (!codigoInput[solicitud.id]) return;

    // Actualizar solicitud
    updateSolicitud(solicitud.id, {
      codigoAsignado: codigoInput[solicitud.id],
      estado: "aprobado",
    });

    // Agregar al store de códigos
    addCode({
      email: solicitud.email,
      code: codigoInput[solicitud.id],
      status: "activo",
    });

    setCodigoInput((prev) => ({ ...prev, [solicitud.id]: "" }));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Solicitudes de Servicio</h1>

      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Teléfono</th>
            <th className="p-3 text-left">Servicio</th>
            <th className="p-3 text-left">Estado</th>
            <th className="p-3 text-left">Código</th>
            <th className="p-3 text-left">Acción</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((s) => (
            <tr key={s.id} className="border-b">
              <td className="p-3">{s.nombre}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3">{s.telefono}</td>
              <td className="p-3">{s.servicio}</td>
              <td className="p-3 capitalize">{s.estado}</td>
              <td className="p-3">
                {s.codigoAsignado ? (
                  s.codigoAsignado
                ) : (
                  <input
                    type="text"
                    placeholder="Asignar código"
                    value={codigoInput[s.id] || ""}
                    onChange={(e) =>
                      setCodigoInput((prev) => ({
                        ...prev,
                        [s.id]: e.target.value,
                      }))
                    }
                    className="px-2 py-1 border rounded"
                  />
                )}
              </td>
              <td className="p-3">
                {!s.codigoAsignado && (
                  <button
                    onClick={() => handleAsignarCodigo(s)}
                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                  >
                    Asignar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};