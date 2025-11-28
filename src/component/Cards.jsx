import { MailQuestionMark, Key, Clock, CheckCircle, Wrench } from "lucide-react";

/* ----------------------------------------------------
   CARD DE ERROR
-----------------------------------------------------*/
export const CardError = ({ title, message, onClose }) => (
  <div className="rounded-xl overflow-hidden shadow-lg bg-red-50 p-6 w-full max-w-md text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-200 mb-4 mx-auto">
      <MailQuestionMark className="w-10 h-10 text-red-600" />
    </div>

    <h2 className="text-xl font-bold text-red-700 mb-2">{title}</h2>
    <p className="text-red-700 font-medium">{message}</p>

    <button
      onClick={onClose}
      className="px-4 py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition"
    >
      Cerrar
    </button>
  </div>
);

/* ----------------------------------------------------
   CARD DE CÓDIGO ÉXITO
-----------------------------------------------------*/
export const CardSuccessCode = ({ title, message, code, onCopy, onNewSearch }) => (
  <div className="flex flex-col items-center rounded-xl shadow-sm bg-white p-8 text-center w-full max-w-md">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-200 mb-6">
      <Key className="w-10 h-10 text-blue-600" />
    </div>

    <h2 className="text-gray-500 text-base font-medium mb-2">{title}</h2>

    <p className="text-gray-900 text-4xl font-bold mb-4">{code}</p>

    <p className="text-gray-500 text-sm mb-5">{message}</p>

    <div className="flex flex-col w-full max-w-xs items-center gap-3">
      <button
        onClick={onCopy}
        className="px-4 py-2 bg-white border border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white rounded-lg font-semibold shadow-md transition"
      >
        Copiar código
      </button>

      <button
        onClick={onNewSearch}
        className="px-6 py-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition"
      >
        Realizar otra búsqueda
      </button>
    </div>
  </div>
);

/* ----------------------------------------------------
   CARD DE ACTIVACIÓN
-----------------------------------------------------*/
export const CardActivation = ({ title, message, status, onClose }) => {
  const styles = {
    pendiente: { bg: "bg-yellow-50", text: "text-yellow-700", icon: <Clock className="w-10 h-10 text-yellow-600" /> },
    exitosa:   { bg: "bg-green-50", text: "text-green-700", icon: <CheckCircle className="w-10 h-10 text-green-600" /> },
    manual:    { bg: "bg-blue-50", text: "text-blue-700", icon: <Wrench className="w-10 h-10 text-blue-600" /> },
  };

  const { bg, text, icon } = styles[status] || styles.pendiente;

  return (
    <div className={`rounded-xl shadow-lg p-6 w-full max-w-md text-center ${bg}`}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow mb-4 mx-auto">
        {icon}
      </div>

      <h2 className={`text-xl font-bold mb-2 ${text}`}>{title}</h2>
      <p className={`font-medium ${text}`}>{message}</p>

      <button
        onClick={onClose}
        className="px-4 py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition"
      >
        Cerrar
      </button>
    </div>
  );
};

/* ----------------------------------------------------
   WRAPPER: CARD UNIFICADO
-----------------------------------------------------*/
export const Card = ({ type, ...props }) => {
  switch (type) {
    case "error":
      return <CardError {...props} />;

    case "success": // código encontrado
      return <CardSuccessCode {...props} />;

    case "pendiente":
    case "exitosa":
    case "manual": // estados de activación
      return <CardActivation status={type} {...props} />;

    default:
      return (
        <CardError
          title="Error interno"
          message="Tipo de tarjeta desconocido."
          onClose={props.onClose}
        />
      );
  }
};

/* ----------------------------------------------------
   MODAL WRAPPER
-----------------------------------------------------*/
export const ModalCard = ({ children, onClose }) => (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
);