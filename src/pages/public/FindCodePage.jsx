import { useState } from "react";
import { ModalCard, Card } from "../../component/Cards";
import { useClientStore } from "../../store/useClientesStore";

export const FindAccountPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const clients = useClientStore((state) => state.clients);

  const handleSearch = (e) => {
    e.preventDefault();
    setModalContent(null);

    if (!email.includes("@")) {
      setModalContent({
        type: "error",
        title: "Correo inválido",
        message: "Ingresa un correo válido.",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const client = clients.find((c) => c.email === email);

      if (!client) {
        setModalContent({
          type: "error",
          title: "No encontrado",
          message: "Este correo no tiene ninguna compra registrada.",
        });
        return;
      }

      if (!client.accountEmail) {
        setModalContent({
          type: "info",
          title: "Pendiente de asignación",
          message:
            "Tu cuenta de acceso aún no ha sido asignada. Vuelve a intentar más tarde.",
        });
        return;
      }

      // Cuenta encontrada
      setModalContent({
        type: "success",
        title: "Cuenta encontrada",
        message: "Este es el correo asignado para acceder al servicio:",
        code: client.accountEmail,
      });
    }, 1000);
  };

  const closeModal = () => setModalContent(null);

  return (
    <div className="min-h-screen w-full max-w-lg mx-auto text-center flex flex-col justify-center px-4">
      <h1 className="text-3xl font-bold mb-3">Buscar Cuenta Asignada</h1>
      <p className="text-gray-600 text-sm mb-6">
        Ingresa el correo con el que realizaste la compra.
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md"
        >
          Buscar Cuenta
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
