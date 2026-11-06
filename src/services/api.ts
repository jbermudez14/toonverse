
import type { Series } from "../types/series";

const API_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

interface TmdbShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  vote_average: number;
  first_air_date: string;
}

function adaptSeries(show: TmdbShow): Series {
  const imageUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : null;

  const genres = show.genres
    ? show.genres.map((genre) => genre.name)
    : (show.genre_ids ?? []).map((id) =>
        id === 16 ? "Animación" : `Género ${id}`
      );

  return {
    id: show.id,
    name: show.name,
    summary: show.overview || null,
    image: imageUrl
      ? { medium: imageUrl, original: imageUrl }
      : null,
    genres,
    rating: {
      average: show.vote_average
        ? Number(show.vote_average.toFixed(1))
        : null,
    },
    premiered: show.first_air_date || null,
    network: null,
    webChannel: null,
  };
}

export async function getSeries(page: number = 1): Promise<Series[]> {
  const response = await fetch(
    `${API_URL}/discover/tv?with_genres=16&language=es-ES&sort_by=popularity.desc&page=${page}`,
    { headers }
  );

  if (!response.ok) {
    throw new Error("No se pudieron cargar las caricaturas");
  }

  const data = await response.json();

  return data.results.map(adaptSeries);
}

export async function getSeriesById(id: string): Promise<Series> {
  const response = await fetch(
    `${API_URL}/tv/${id}?language=es-ES`,
    { headers }
  );

  if (!response.ok) {
    throw new Error("No se encontró la serie");
  }

  const data: TmdbShow = await response.json();

  return adaptSeries(data);
}
