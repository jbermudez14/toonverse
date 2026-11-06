
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Toast, { type ToastType } from "./components/Toast";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Detail from "./pages/Detail";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  useEffect(() => {
    function handleToast(event: Event) {
      const customEvent = event as CustomEvent<{
        message: string;
        type: ToastType;
      }>;

      setToast(customEvent.detail);
    }

    window.addEventListener("toonverse-toast", handleToast);

    return () => {
      window.removeEventListener("toonverse-toast", handleToast);
    };
  }, []);

  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0b0b17] text-white">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/series/:id" element={<Detail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/contact" element={<Contact />} />

            {/* Ruta para páginas que no existen */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
