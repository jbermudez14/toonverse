

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSeriesById } from "../services/api";
import type { Series } from "../types/series";

function Detail() {
  const { id } = useParams();
  const [serie, setSerie] = useState<Series | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          throw new Error("No se encontró el identificador de la serie");
        }

        const data = await getSeriesById(id);
        setSerie(data);
      } catch {
        setError("No pudimos cargar la información de esta caricatura.");
        setSerie(null);
      } finally {
        setLoading(false);
      }
    }

    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <p className="px-4 py-20 text-center text-purple-400">
        Cargando información...
      </p>
    );
  }

  if (error || !serie) {
    return (
      <main className="min-h-screen bg-[#0b0b17] px-4 py-20 text-center">
        <p role="alert" className="text-red-400">
          {error || "Serie no encontrada"}
        </p>

        <Link
          to="/explore"
          className="mt-6 inline-block rounded-xl bg-purple-600 px-6 py-3 font-bold text-white hover:bg-purple-500"
        >
          Volver a explorar
        </Link>
      </main>
    );
  }

  return (
    <section className="min-h-screen bg-[#0b0b17] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">

        <Link
          to="/explore"
          className="mb-8 inline-block text-sm text-purple-400 transition hover:text-purple-300 sm:text-base"
        >
          ← Volver a explorar
        </Link>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">

          <div className="flex justify-center">
            {serie.image?.original ? (
              <img
                src={serie.image.original}
                alt={`Póster de ${serie.name}`}
                className="w-full max-w-xs rounded-2xl shadow-2xl sm:max-w-md"
              />
            ) : (
              <div className="flex h-80 w-full max-w-xs items-center justify-center rounded-2xl bg-[#25213a] text-gray-400 sm:h-96 sm:max-w-md">
                Sin imagen disponible
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-widest text-purple-400 sm:text-sm">
              ToonVerse · Detalles
            </p>

            <h1 className="mt-4 break-words text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              {serie.name}
            </h1>

            <p className="mt-5 text-base text-purple-300 sm:text-lg">
              ⭐ {serie.rating.average ?? "Sin calificación"}
            </p>

            <p className="mt-4 text-sm text-gray-400 sm:text-base">
              {serie.genres.join(" · ")}
            </p>

            <h2 className="mt-7 text-lg font-bold text-white sm:mt-8 sm:text-xl">
              Sinopsis
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-300 sm:text-base">
              {serie.summary || "No hay sinopsis disponible."}
            </p>

            <p className="mt-6 text-sm text-gray-400">
              Fecha de estreno: {serie.premiered || "No disponible"}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Detail;
