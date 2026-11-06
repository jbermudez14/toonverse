
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: "border-green-500 text-green-400",
    error: "border-red-500 text-red-400",
    info: "border-purple-500 text-purple-400",
  };

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed right-5 top-5 z-50 flex items-center gap-3 rounded-xl border bg-[#151525] px-5 py-4 shadow-2xl ${styles[type]}`}
    >
      <span className="text-xl font-bold">{icons[type]}</span>

      <p className="text-sm font-medium">{message}</p>

      <button
        onClick={onClose}
        aria-label="Cerrar notificación"
        className="ml-3 text-gray-400 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
