
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Inicio", path: "/" },
    { name: "Explorar", path: "/explore" },
    { name: "Favoritos", path: "/favorites" },
    { name: "Contacto", path: "/contact" },
  ];

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "block font-bold text-purple-400"
      : "block text-white transition hover:text-purple-300";

  return (
    <header className="border-b border-purple-500/30 bg-[#151525] p-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-bold text-purple-400"
        >
          ToonVerse
        </NavLink>

        {/* Menú para computador */}
        <div className="hidden items-center gap-6 text-white md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={linkStyle}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Botón para celular */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-purple-500/40 px-3 py-2 text-xl text-purple-400 md:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Menú desplegable para celular */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="mt-5 space-y-4 border-t border-purple-500/20 pt-5 md:hidden"
        >
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setMenuOpen(false)}
              className={linkStyle}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
