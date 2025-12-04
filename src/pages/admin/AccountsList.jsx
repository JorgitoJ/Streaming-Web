import { useAccountStore } from "../../store/useAccountStore";

export const AccountsList = () => {
  const emails = useAccountStore((s) => s.emails);

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Correos Registrados</h1>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Correo</th>
              <th className="p-3 text-left">Plataforma</th>
              <th className="p-3 text-left">Estado</th>
            </tr>
          </thead>

          <tbody>
            {emails.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">
                  No hay correos aún
                </td>
              </tr>
            ) : (
              emails.map((acc) => (
                <tr key={acc.id} className="border-t">
                  <td className="p-3">{acc.email}</td>
                  <td className="p-3">{acc.platform}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        acc.status === "disponible"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {acc.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};