
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import ConfirmModal from "../components/ConfirmModal";

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedSerie = favorites.find(
    (serie) => serie.id === selectedId
  );

  function handleConfirm() {
    if (selectedId !== null) {
      removeFavorite(selectedId);
    }

    setSelectedId(null);
  }

  function handleCancel() {
    setSelectedId(null);
  }

  return (
    <section className="min-h-screen bg-[#0b0b17] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">

        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-purple-400">
          Your collection
        </p>

        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Mis <span className="text-purple-400">favoritos</span>
        </h1>

        <p className="mt-3 text-sm text-gray-400 sm:text-base">
          Aquí encontrarás todas tus caricaturas guardadas.
        </p>

        {favorites.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-white/10 bg-[#151525] p-6 text-center sm:mt-16 sm:p-12">
            <p className="text-5xl">🤍</p>

            <h2 className="mt-5 text-xl font-bold text-white sm:text-2xl">
              Aún no tienes favoritos
            </h2>

            <p className="mt-3 text-sm text-gray-400 sm:text-base">
              Explora ToonVerse y guarda las caricaturas que más te gusten.
            </p>

            <Link
              to="/explore"
              className="mt-8 inline-block rounded-xl bg-purple-600 px-7 py-3 font-bold text-white transition hover:bg-purple-500"
            >
              Explorar caricaturas
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {favorites.map((serie) => (
              <article
                key={serie.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#151525] transition hover:-translate-y-1 hover:border-purple-500/50"
              >
                <Link to={`/series/${serie.id}`} className="block">
                  {serie.image?.medium ? (
                    <img
                      src={serie.image.medium}
                      alt={`Póster de ${serie.name}`}
                      className="h-48 w-full object-cover sm:h-64"
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-[#25213a] text-sm text-gray-400 sm:h-64">
                      Sin imagen
                    </div>
                  )}

                  <div className="p-3 sm:p-4">
                    <h2 className="break-words text-sm font-bold text-white sm:text-base">
                      {serie.name}
                    </h2>

                    <p className="mt-2 text-xs text-purple-400 sm:text-sm">
                      {serie.genres.join(" · ")}
                    </p>

                    <p className="mt-2 text-xs text-gray-400 sm:text-sm">
                      ⭐ {serie.rating.average ?? "Sin calificación"}
                    </p>
                  </div>
                </Link>

                <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                  <button
                    type="button"
                    onClick={() => setSelectedId(serie.id)}
                    className="w-full rounded-lg bg-red-500/10 px-2 py-2 text-xs text-red-400 transition hover:bg-red-500/20 sm:px-3 sm:text-sm"
                    aria-label={`Quitar ${serie.name} de favoritos`}
                  >
                    ❤️ Quitar de favoritos
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <ConfirmModal
          open={selectedId !== null}
          title="¿Eliminar de favoritos?"
          message={`¿Estás segura de que deseas quitar "${selectedSerie?.name ?? ""}" de tu colección?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />

      </div>
    </section>
  );
}

export default Favorites;

