
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-[#0b0b17] px-6 text-center">
      <h1 className="text-8xl font-extrabold text-purple-400">
        404
      </h1>

      <h2 className="mt-6 text-2xl font-bold text-white">
        ¡Ups! Esta caricatura se perdió
      </h2>

      <p className="mt-4 max-w-md text-gray-400">
        Parece que esta página no existe o fue trasladada
        a otra dimensión.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-xl bg-purple-600 px-7 py-3 font-bold text-white transition hover:bg-purple-500"
      >
        Volver al inicio
      </Link>
    </main>
  );
}

export default NotFound;
