import React, { useState } from "react";

export const MailSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: si está relleno, tratar como OK pero sin enviar
    if (fd.get("_honey")) {
      setIsSubmitted(true);
      setLoading(false);
      form.reset();
      return;
    }

    // Construimos el payload JSON esperado por FormSubmit
    const payload = {
      email: fd.get("email"),
      message: fd.get("message"),
      _subject: "Nueva consulta desde Audita - Experiencia de usuario",
      _autoresponse:
        "¡Gracias por contactarnos! Hemos recibido tu mensaje sobre tu experiencia con Audita y te responderemos a la brevedad.",
      // Opcionales:
      // _template: "table",
    };

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/algoritmicaia@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        // FormSubmit suele devolver JSON { success: "false", message: "..." }
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.message || "No se pudo enviar el mensaje. Intenta más tarde."
        );
      }

      // OK
      setIsSubmitted(true);
      form.reset();
    } catch (e2) {
      setErr(e2.message || "Error de red. Reintentá en unos segundos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border-t border-white" />
      <div className="bg-green-900 p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Tu participación es clave
        </h2>
        <p className="text-white text-lg mb-8 max-w-3xl mx-auto">
          Al probar Audita nos ayudás a seguir desarrollando soluciones que
          simplifiquen el trabajo de los profesionales de Higiene y Seguridad en
          Argentina.
        </p>
        <div className="w-16 h-0.5 bg-white mx-auto mb-8" />
        <h3 className="text-xl font-bold text-white mb-8">
          Dejanos un mensaje con tu experiencia.
        </h3>

        <div className="max-w-md mx-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <input
                type="email"
                name="email"
                placeholder="Ingrese el correo electrónico*"
                required
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors duration-200 text-gray-800"
              />

              <textarea
                name="message"
                placeholder="Dejanos un mensaje*"
                rows={4}
                required
                minLength={10}
                maxLength={2000}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors duration-200 resize-vertical min-h-[100px] text-gray-800"
              />

              {/* Honeypot accesible (no uses display:none) */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="_honey">No completar</label>
                <input id="_honey" name="_honey" type="text" tabIndex="-1" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-gray-800 hover:bg-gray-100 font-medium px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors duration-200"
              >
                {loading ? "Enviando…" : "Enviar"}
              </button>

              <div aria-live="polite" className="text-sm min-h-[1.25rem] text-white">
                {err}
              </div>
            </form>
          ) : (
            <div className="text-center">
              <h4 className="text-2xl font-bold text-white mb-4">¡Gracias!</h4>
              <p className="text-white text-lg">
                Tu mensaje ha sido enviado exitosamente. Te contactaremos pronto.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="border-b border-white" />
    </>
  );
};
