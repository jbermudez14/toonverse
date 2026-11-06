import { useParams } from "react-router-dom";

function SeriesDetail() {
  const { id } = useParams();

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold text-purple-400">
        Detalle de serie
      </h1>

      <p className="mt-4 text-gray-400">
        ID de la serie: {id}
      </p>
    </section>
  );
}

export default SeriesDetail;
