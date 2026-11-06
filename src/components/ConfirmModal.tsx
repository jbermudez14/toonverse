
import { useEffect, useRef } from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleCancel() {
    onCancel();
  }

  function handleConfirm() {
    onConfirm();
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      className="fixed left-1/2 top-1/2 m-0 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-purple-500/30 bg-[#151525] p-0 text-white backdrop:bg-black/70"
      aria-labelledby="confirm-title"
    >
      <div className="p-7">
        <h2
          id="confirm-title"
          className="text-2xl font-bold text-purple-400"
        >
          {title}
        </h2>

        <p className="mt-4 leading-7 text-gray-300">
          {message}
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-white/20 px-5 py-2 text-gray-300 transition hover:bg-white/10"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-lg bg-purple-600 px-5 py-2 font-bold text-white transition hover:bg-purple-500"
          >
            Confirmar
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmModal;
