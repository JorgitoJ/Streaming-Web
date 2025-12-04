import { useState } from "react";
import { useAccountStore } from "../../store/useAccountStore";

export const AddAccount = () => {
  const addAccount = useAccountStore((s) => s.addAccount);

  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("Netflix");
  const [msg, setMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      return setMsg({ type: "error", text: "Correo inválido" });
    }

    addAccount({
      id: crypto.randomUUID(),
      email,
      platform,
      status: "disponible",
    });

    setMsg({ type: "success", text: "Correo agregado correctamente" });
    setEmail("");
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Agregar nuevo correo</h2>

      {msg && (
        <div
          className={`p-3 rounded mb-4 ${
            msg.type === "error"
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="font-medium">Correo</label>
          <input
            className="w-full border p-2 rounded mt-1"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Plataforma</label>
          <select
            className="w-full border p-2 rounded mt-1"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option>Netflix</option>
            <option>Disney+</option>
            <option>HBO Max</option>
            <option>Paramount+</option>
            <option>Crunchyroll</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Guardar
        </button>
      </form>
    </div>
  );
};
