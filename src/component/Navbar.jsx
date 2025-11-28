import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { UserCog } from "lucide-react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/buscar-codigo", label: "Buscar Código" },
    { to: "/activacion", label: "Estado de Activación" },
  ];

  return (
    <nav className="w-full shadow-lg bg-white/90 backdrop-blur-sm fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          CodeDelivery
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 text-lg items-center">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition ${
                  isActive ? "bg-blue-700 font-semibold" : ""
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          {/* Botón Admin (solo desktop) */}
          <Link
            to="/login"
            className="ml-5 px-3 py-2 bg-gray-700 hover:bg-gray-900 text-white rounded-lg shadow-md font-semibold transition"
          >
            <UserCog size={20}/>
          </Link>
        </div>

        {/* Mobile button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col p-4 gap-4 text-lg">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `block py-1 ${isActive ? "text-blue-600 font-semibold" : ""}`
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}

            {/* Botón Admin (solo mobile) */}
            <Link
              to="/login"
              className="mt-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg shadow-md font-semibold transition text-center"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};