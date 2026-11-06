
export interface Series {
  id: number;
  name: string;
  summary: string | null;
  image: {
    medium: string;
    original: string;
  } | null;
  genres: string[];
  rating: {
    average: number | null;
  };
  premiered: string | null;
  network: {
    name: string;
  } | null;
  webChannel: {
    name: string;
  } | null;
}
