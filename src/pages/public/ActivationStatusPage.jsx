import { useState } from "react";
import { 
  CardError, 
  CardActivation, 
  ModalCard 
} from "../../component/Cards";
import { useActivacionesStore } from "../../store/useActivacionesStore";

export const ActivationStatusPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Acceso a activaciones desde el store
  const activaciones = useActivacionesStore((state) => state.activaciones);
  const addActivacion = useActivacionesStore((state) => state.addActivacion);

  const handleSearch = async (e) => {
    e.preventDefault();
    setModalContent(null);

    if (!email.includes("@")) {
      setModalContent({
        type: "error",
        title: "Correo inválido",
        message: "Por favor ingresa un correo válido.",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Buscar activación en el store
      const found = activaciones.find((a) => a.email === email);

      if (found) {
        setModalContent({
          type: "activation",
          status: found.status,
          title: found.title,
          message: found.message,
        });
      } else {
        // Si no existe, agregar activación simulada
        const newActivation = {
          id: Date.now(),
          email,
          status: "pendiente",
          title: "Activación Pendiente",
          message: "Tu TV está esperando confirmación.",
        };
        addActivacion(newActivation);

        setModalContent({
          type: "activation",
          status: newActivation.status,
          title: newActivation.title,
          message: newActivation.message,
        });
      }
    }, 1500);
  };

  const closeModal = () => setModalContent(null);

  return (
    <div className="min-h-screen w-100 mx-auto text-center flex flex-col justify-center relative">
      <h1 className="text-3xl font-bold mb-3">Estado de Activación de TV</h1>
      <p className="text-gray-600 text-sm">
        Ingresa el correo asociado a la activación del televisor.
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition-colors"
        >
          Consultar Activación
        </button>
      </form>

      {loading && (
        <div className="mt-6 text-gray-700 font-semibold animate-pulse">
          Consultando activación...
        </div>
      )}

      {modalContent && (
        <ModalCard onClose={closeModal}>
          {modalContent.type === "error" && (
            <CardError
              title={modalContent.title}
              message={modalContent.message}
              onClose={closeModal}
            />
          )}
          {modalContent.type === "activation" && (
            <CardActivation
              status={modalContent.status}
              title={modalContent.title}
              message={modalContent.message}
              onClose={closeModal}
            />
          )}
        </ModalCard>
      )}
    </div>
  );
};