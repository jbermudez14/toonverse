
import { useEffect, useState } from "react";

function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("toonverse-modal-shown");

    if (!alreadyShown) {
      setShowModal(true);
      sessionStorage.setItem("toonverse-modal-shown", "true");
    }
  }, []);

  function handleAccept() {
    setShowModal(false);
  }

  function handleReject() {
    setShowModal(false);
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-20">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-purple-400 sm:text-sm sm:tracking-[0.3em]">
          Welcome to ToonVerse
        </p>

        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-7xl">
          Tu universo de series
          <span className="block text-purple-400">animadas</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
          Descubre tus caricaturas favoritas y explora
          un mundo lleno de aventuras.
        </p>
      </section>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6"
          role="presentation"
        >
          <div
            className="w-full max-w-md rounded-2xl border border-purple-500/30 bg-[#151525] p-6 text-center shadow-2xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            aria-describedby="welcome-description"
          >
            <p className="text-4xl sm:text-5xl">🎬</p>

            <h2
              id="welcome-title"
              className="mt-5 text-xl font-extrabold text-white sm:text-2xl"
            >
              ¡Bienvenido a ToonVerse!
            </h2>

            <p
              id="welcome-description"
              className="mt-4 text-sm leading-7 text-gray-400 sm:text-base"
            >
              ¿Quieres recibir novedades y recomendaciones
              sobre tus series animadas favoritas?
            </p>

            <button
              type="button"
              onClick={handleAccept}
              className="mt-8 w-full rounded-xl bg-purple-600 px-6 py-3 font-bold text-white transition hover:bg-purple-500"
            >
              ¡Sí, quiero!
            </button>

            {/*
              PATRÓN OSCURO INTENCIONAL:
              La opción de rechazo tiene menor visibilidad visual
              que la opción de aceptación. Esto ilustra un patrón
              de diseño que puede influir en la decisión del usuario.
              Se incluye con fines académicos y ambas opciones siguen
              siendo accesibles y funcionales.
            */}
            <button
              type="button"
              onClick={handleReject}
              className="mt-5 text-sm text-gray-500 underline transition hover:text-gray-300"
            >
              No, gracias
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
