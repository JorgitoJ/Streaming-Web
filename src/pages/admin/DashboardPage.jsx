import { useMemo } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useActivacionesStore } from "../../store/useActivacionesStore";
import { AddAccount } from "../../pages/admin/AddAccount.jsx";

export const DashboardPage = () => {
  const activaciones = useActivacionesStore((state) => state.activaciones);
  const codes = AddAccount((state) => state.codes);

  const chartData = useMemo(() => {
    // Generamos datos de activaciones por día para el gráfico
    const days = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
    return days.map((day) => ({
      day,
      activations: activaciones.filter(a => a.day === day).length
    }));
  }, [activaciones]);

  return (
    <div className="min-h-screen p-6 bg-gray-50 ">
      <h1 className="text-3xl text-center font-bold mb-5">Panel de Administración</h1>

      {/* Widgets rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Activaciones Pendientes</h2>
          <p className="text-gray-700 text-2xl font-bold">
            {activaciones.filter(a => a.status === "pendiente").length}
          </p>
          <Link
            to="/admin/activaciones"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            Ver activaciones
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Códigos Generados</h2>
          <p className="text-gray-700 text-2xl font-bold">{codes.length}</p>
          <Link
            to="/admin/correo"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            Gestionar códigos
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Total Activaciones</h2>
          <p className="text-gray-700 text-2xl font-bold">{activaciones.length}</p>
        </div>
      </div>

      {/* Área de estadísticas */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Activaciones de la Semana</h2>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={chartData}>
            <XAxis dataKey="day" stroke="black" />
            <YAxis stroke="black"/>
            <Tooltip />
            <Bar dataKey="activations" fill="#137FEC" radius={[5,5,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};