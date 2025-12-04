import { useClientStore } from "../../store/useClientesStore";
import { useAccountStore } from "../../store/useAccountStore";

export const AssignAccount = () => {
  const clients = useClientStore((s) => s.clients);
  const updateClient = useClientStore((s) => s.updateClient);
  const emails = useAccountStore((s) => s.emails);
  const updateAccount = useAccountStore((s) => s.updateAccount);

  const availableAccounts = emails.filter((a) => a.status === "disponible");

  const handleAssign = (clientId, email) => {
    updateClient(clientId, { accountEmail: email });
    updateAccount(email, { status: "ocupado" });
  };

  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl font-bold mb-4">Asignar correos</h1>

      <div className="overflow-x-auto">
        <table className="w-full border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Plataforma</th>
              <th className="p-3 text-left">Correo Asignado</th>
              <th className="p-3 text-left">Acción</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.service}</td>
                <td className="p-3">{c.accountEmail ?? "—"}</td>

                <td className="p-3">
                  {c.accountEmail ? (
                    <span className="text-green-600 font-semibold">
                      Asignado
                    </span>
                  ) : availableAccounts.length === 0 ? (
                    <span className="text-red-600">No hay disponibles</span>
                  ) : (
                    <select
                      className="border p-2 rounded"
                      onChange={(e) => handleAssign(c.id, e.target.value)}
                    >
                      <option>Seleccionar</option>
                      {availableAccounts.map((acc) => (
                        <option key={acc.id} value={acc.email}>
                          {acc.email} ({acc.platform})
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
