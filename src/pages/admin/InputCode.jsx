import { useState } from "react";
import { useCodesStore } from "../../store/usecodesStore";

export const CodesAdmin = () => {
  const addCode = useCodesStore((state) => state.addCode);

  const [platform, setPlatform] = useState("Netflix");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("Disponible");
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setMessage({ type: "error", text: "El código no puede estar vacío" });
      return;
    }

    addCode({
      platform,
      code,
      status,
      createdAt: new Date().toISOString(),
    });

    setMessage({ type: "success", text: "Código registrado correctamente" });

    setCode("");
    setStatus("activo");
    setPlatform("Netflix");
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4">Registrar Código de Plataforma</h1>

      {message && (
        <div
          className={`p-3 rounded-lg mb-4 ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* PLATAFORMA */}
        <div className="flex flex-col text-left">
          <label className="font-medium mb-1">Plataforma</label>
          <select
            className="border px-3 py-2 rounded-lg"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option>Netflix</option>
            <option>HBO Max</option>
            <option>Prime Video</option>
            <option>Crunchyroll</option> 
          </select>
        </div>

        {/* CÓDIGO */}
        <div className="flex flex-col text-left">
          <label className="font-medium mb-1">Código</label>
          <input
            type="text"
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="ABC123-XYZ987"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

       
        {/* BOTÓN */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 shadow"
        >
          Guardar Código
        </button>
      </form>
    </div>
  );
};
