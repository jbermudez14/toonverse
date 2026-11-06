
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import type { Series } from "../types/series";

interface SeriesCardProps {
  serie: Series;
}

function SeriesCard({ serie }: SeriesCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(serie.id);

  function handleFavorite() {
    if (favorite) {
      removeFavorite(serie.id);
    } else {
      addFavorite(serie);
    }
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#151525] transition hover:-translate-y-1 hover:border-purple-500/50">
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
          <h2 className="font-bold text-white">{serie.name}</h2>

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
          type="button"
          onClick={handleFavorite}
          aria-label={
            favorite
              ? `Quitar ${serie.name} de favoritos`
              : `Agregar ${serie.name} a favoritos`
          }
          aria-pressed={favorite}
          className="w-full rounded-lg bg-purple-600/20 px-3 py-2 text-sm font-semibold text-purple-300 transition hover:bg-purple-600/40"
        >
          {favorite ? "❤️ En favoritos" : "🤍 Agregar a favoritos"}
        </button>
      </div>
    </article>
  );
}

export default SeriesCard;
