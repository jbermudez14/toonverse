
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSeries } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import type { Series } from "../types/series";

function Explore() {
  const [series, setSeries] = useState<Series[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [loadMoreError, setLoadMoreError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function loadSeries() {
      try {
        setLoading(true);
        setError("");

        const data = await getSeries(1);
        setSeries(data);
        setHasMore(data.length === 20);
      } catch {
        setError("No pudimos cargar las series. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    }

    loadSeries();
  }, []);

  async function handleLoadMore() {
    try {
      setLoadingMore(true);
      setLoadMoreError("");

      const nextPage = page + 1;
      const data = await getSeries(nextPage);

      setSeries((previous) => {
        const newSeries = data.filter(
          (item) => !previous.some((serie) => serie.id === item.id)
        );

        return [...previous, ...newSeries];
      });

      setPage(nextPage);
      setHasMore(data.length === 20);
    } catch {
      setLoadMoreError("No pudimos cargar más series. Intenta nuevamente.");
    } finally {
      setLoadingMore(false);
    }
  }

  function toggleFavorite(serie: Series) {
    if (isFavorite(serie.id)) {
      removeFavorite(serie.id);
    } else {
      addFavorite(serie);
    }
  }

  const filteredSeries = series.filter((serie) =>
    serie.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-[#0b0b17] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-purple-400">
          Discover your favorites
        </p>

        <h1 className="text-5xl font-extrabold text-white">
          Explorar <span className="text-purple-400">series</span>
        </h1>

        <p className="mt-4 text-gray-400">
          Encuentra tus caricaturas favoritas y descubre nuevas aventuras.
        </p>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar una serie..."
          aria-label="Buscar una serie"
          className="mt-10 w-full max-w-xl rounded-xl border border-purple-500/30 bg-[#151525] px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-purple-400"
        />

        {loading && (
          <p className="mt-12 text-center text-purple-400">
            Cargando series...
          </p>
        )}

        {error && (
          <p role="alert" className="mt-12 text-center text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && filteredSeries.length === 0 && (
          <p className="mt-12 text-center text-gray-400">
            No encontramos series con ese nombre.
          </p>
        )}

        {!loading && !error && (
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {filteredSeries.map((serie) => (
              <article
                key={serie.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#151525] transition hover:-translate-y-1 hover:border-purple-500/50"
              >
                <Link to={`/series/${serie.id}`} className="block">
                  {serie.image?.medium ? (
                    <img
                      src={serie.image.medium}
                      alt={`Póster de ${serie.name}`}
                      className="h-64 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-64 items-center justify-center bg-[#25213a] text-gray-400">
                      Sin imagen
                    </div>
                  )}

                  <div className="p-4">
                    <h2 className="font-bold text-white">
                      {serie.name}
                    </h2>

                    <p className="mt-2 text-sm text-purple-400">
                      {serie.genres.join(" · ")}
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                      ⭐ {serie.rating.average ?? "Sin calificación"}
                    </p>
                  </div>
                </Link>

                <div className="px-4 pb-4">
                  <button
  onClick={() => toggleFavorite(serie)}
  aria-label={
    isFavorite(serie.id)
      ? `Quitar ${serie.name} de favoritos`
      : `Agregar ${serie.name} a favoritos`
  }
  className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600/20 px-3 py-2 text-sm text-purple-300 transition hover:bg-purple-600/40"
>
  <span>
    {isFavorite(serie.id) ? "❤️" : "🤍"}
  </span>

  {isFavorite(serie.id)
    ? "En favoritos"
    : "Agregar a favoritos"}
</button>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && series.length > 0 && (
          <div className="mt-12 text-center">
            {loadMoreError && (
              <p role="alert" className="mb-4 text-red-400">
                {loadMoreError}
              </p>
            )}

            {hasMore && (
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="rounded-xl bg-purple-600 px-8 py-3 font-bold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingMore ? "Cargando..." : "Cargar más"}
              </button>
            )}

            {!hasMore && (
              <p className="text-gray-400">
                Has llegado al final de las series disponibles.
              </p>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

export default Explore;
