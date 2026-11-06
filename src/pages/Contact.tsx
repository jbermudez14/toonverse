

import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isFormValid =
    name.trim().length >= 2 &&
    emailRegex.test(email) &&
    message.trim().length >= 10;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    if (name.trim().length < 2) {
      newErrors.name = "Escribe un nombre válido.";
    }

    if (!emailRegex.test(email)) {
      newErrors.email = "Escribe un correo electrónico válido.";
    }

    if (message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres.";
    }

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.message) {
      window.dispatchEvent(
        new CustomEvent("toonverse-toast", {
          detail: {
            message: "Por favor, revisa los campos del formulario.",
            type: "error",
          },
        })
      );

      return;
    }

    window.dispatchEvent(
      new CustomEvent("toonverse-toast", {
        detail: {
          message: "¡Gracias! Tu mensaje ha sido recibido correctamente.",
          type: "success",
        },
      })
    );

    setName("");
    setEmail("");
    setMessage("");

    setErrors({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <section className="min-h-screen bg-[#0b0b17] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">

        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-purple-400 sm:text-sm">
          Estamos para escucharte
        </p>

        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Contácta<span className="text-purple-400">nos</span>
        </h1>

        <p className="mt-3 text-sm text-gray-400 sm:text-base">
          ¿Tienes alguna pregunta? Nos encantaría escucharte.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-white/10 bg-[#151525] p-5 sm:mt-10 sm:space-y-6 sm:p-8"
          noValidate
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-white sm:text-base">
              Nombre completo
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="w-full rounded-xl border border-purple-500/30 bg-[#0b0b17] px-4 py-3 text-base text-white outline-none focus:border-purple-400"
            />

            {errors.name && (
              <p id="name-error" className="mt-2 text-sm text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-white sm:text-base">
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full rounded-xl border border-purple-500/30 bg-[#0b0b17] px-4 py-3 text-base text-white outline-none focus:border-purple-400"
            />

            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm text-white sm:text-base">
              Tu mensaje
            </label>

            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              rows={5}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="w-full resize-none rounded-xl border border-purple-500/30 bg-[#0b0b17] px-4 py-3 text-base text-white outline-none focus:border-purple-400"
            />

            {errors.message && (
              <p id="message-error" className="mt-2 text-sm text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full rounded-xl bg-purple-600 py-3 text-base font-bold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
