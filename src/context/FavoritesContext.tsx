
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Series } from "../types/series";

interface FavoritesContextType {
  favorites: Series[];
  addFavorite: (serie: Series) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Series[]>(() => {
    const saved = localStorage.getItem("toonverse-favorites");

    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  function addFavorite(serie: Series) {
    setFavorites((previous) => {
      if (previous.some((item) => item.id === serie.id)) {
        return previous;
      }

      const updated = [...previous, serie];

      localStorage.setItem(
        "toonverse-favorites",
        JSON.stringify(updated)
      );

      return updated;
    });

    window.dispatchEvent(
      new CustomEvent("toonverse-toast", {
        detail: {
          message: `${serie.name} agregada a favoritos`,
          type: "success",
        },
      })
    );
  }

  function removeFavorite(id: number) {
    const serie = favorites.find((item) => item.id === id);

    setFavorites((previous) => {
      const updated = previous.filter((item) => item.id !== id);

      localStorage.setItem(
        "toonverse-favorites",
        JSON.stringify(updated)
      );

      return updated;
    });

    window.dispatchEvent(
      new CustomEvent("toonverse-toast", {
        detail: {
          message: `${serie?.name ?? "Serie"} eliminada de favoritos`,
          type: "info",
        },
      })
    );
  }

  function isFavorite(id: number) {
    return favorites.some((serie) => serie.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites debe utilizarse dentro de FavoritesProvider"
    );
  }

  return context;
}
