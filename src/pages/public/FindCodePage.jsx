import { useState } from "react";
import { Card, ModalCard } from "../../component/Cards";
import { useCodesStore } from "../../store/usecodesStore";

export const FindCodePage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const codes = useCodesStore((state) => state.codes);
  const addCode = useCodesStore((state) => state.addCode);

  const handleSearch = async (e) => {
    e.preventDefault();
    setModalContent(null);

    if (!email.includes("@")) {
      setModalContent({
        type: "error",
        title: "Correo inválido",
        message: "Ingresa un correo válido",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Buscar código en el store
      const found = codes.find((c) => c.email === email);

      if (found) {
        setModalContent({
          type: "success",
          title: "Código encontrado",
          code: found.code,
          message: "Tu código de streaming está listo para usar",
        });
      } else {
        // Si no existe, generar código de ejemplo y agregar al store
        const newCode = {
          email,
          code: Math.random().toString(36).substring(2, 10).toUpperCase(),
        };
        addCode(newCode);

        setModalContent({
          type: "success",
          title: "Código generado",
          code: newCode.code,
          message: "Se ha generado un nuevo código para este correo",
        });
      }
    }, 1500);
  };

  const closeModal = () => setModalContent(null);

  return (
    <div className="min-h-screen w-100 mx-auto text-center flex flex-col justify-center relative">
      <h1 className="text-3xl font-bold mb-3">Buscar Código de Streaming</h1>
      <p className="text-gray-600 text-sm">
        Ingresa el correo con el que realizaste la compra para recuperar tu código.
      </p>

      <form
        onSubmit={handleSearch}
        className="bg-white shadow-lg p-6 rounded-xl flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="tu-correo@gmail.com"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
        >
          Buscar Código
        </button>
      </form>

      {loading && (
        <div className="mt-6 text-blue-600 font-semibold animate-pulse">
          Buscando...
        </div>
      )}

      {modalContent && (
        <ModalCard onClose={closeModal}>
          <Card
            type={modalContent.type}
            title={modalContent.title}
            message={modalContent.message}
            code={modalContent.code}
            onCopy={() =>
              modalContent.code &&
              navigator.clipboard.writeText(modalContent.code)
            }
            onNewSearch={closeModal}
          />
        </ModalCard>
      )}
    </div>
  );
};