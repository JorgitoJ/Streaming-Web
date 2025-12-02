import { useCodesStore } from "../../store/usecodesStore";

export const CodesList = () => {
  const codes = useCodesStore((state) => state.codes);
  const removeCode = useCodesStore((state) => state.removeCode);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Listado de Códigos</h2>

      {codes.length === 0 ? (
        <p className="text-gray-500">No hay códigos registrados.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Plataforma</th>
              <th className="p-2">Código</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-2">{c.platform}</td>
                <td className="p-2 font-mono">{c.code}</td>
                <td className="p-2 capitalize">{c.status}</td>
                <td className="p-2">
                  <button
                    onClick={() => removeCode(c.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
