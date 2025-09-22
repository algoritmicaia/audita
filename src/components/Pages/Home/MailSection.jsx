import React, { useState } from "react";

export const MailSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  // Función para validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return "El email es requerido";
    }
    if (!emailRegex.test(email)) {
      return "Por favor ingresa un email válido";
    }
    return "";
  };

  // Función para validar mensaje
  const validateMessage = (message) => {
    if (!message.trim()) {
      return "El mensaje es requerido";
    }
    if (message.trim().length < 10) {
      return "El mensaje debe tener al menos 10 caracteres";
    }
    if (message.trim().length > 2000) {
      return "El mensaje no puede exceder 2000 caracteres";
    }
    return "";
  };

  // Validación en tiempo real
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setMessageError(validateMessage(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    // Validar campos antes de enviar
    const emailValidation = validateEmail(email);
    const messageValidation = validateMessage(message);

    setEmailError(emailValidation);
    setMessageError(messageValidation);

    // Si hay errores de validación, no enviar
    if (emailValidation || messageValidation) {
      setLoading(false);
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: si está relleno, tratar como OK pero sin enviar
    if (fd.get("_honey")) {
      setIsSubmitted(true);
      setLoading(false);
      form.reset();
      setEmail("");
      setMessage("");
      return;
    }

    // Construimos el payload JSON esperado por FormSubmit
    const payload = {
      email: email.trim(),
      message: message.trim(),
      _subject: "Nueva consulta desde Audita - Experiencia de usuario",
      _autoresponse:
        "¡Gracias por contactarnos! Hemos recibido tu mensaje sobre tu experiencia con Audita y te responderemos a la brevedad.",
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
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.message || "No se pudo enviar el mensaje. Intenta más tarde."
        );
      }

      // OK
      setIsSubmitted(true);
      form.reset();
      setEmail("");
      setMessage("");
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

        <div className="max-w-md mx-auto">
          {!isSubmitted ? (
            <>
              <h3 className="text-xl font-bold text-white mb-8">
                Dejanos un mensaje con tu experiencia.
              </h3>
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Ingrese el correo electrónico*"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className={`block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none transition-colors duration-200 text-gray-800 ${
                      emailError
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-200 text-left">
                      {emailError}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Dejanos un mensaje*"
                    value={message}
                    onChange={handleMessageChange}
                    rows={4}
                    required
                    minLength={10}
                    maxLength={2000}
                    className={`block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none transition-colors duration-200 resize-vertical min-h-[100px] text-gray-800 ${
                      messageError
                        ? "border-red-500 :ring-red-200 focus:border-red-500"
                        : "border-gray-300:ring-blue-200 focus:border-blue-500"
                    }`}
                  />
                  {messageError && (
                    <p className="mt-1 text-sm text-red-200 text-left">
                      {messageError}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-300 text-right">
                    {message.length}/2000 caracteres
                  </p>
                </div>

                {/* Honeypot accesible (no uses display:none) */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="_honey">No completar</label>
                  <input id="_honey" name="_honey" type="text" tabIndex="-1" />
                </div>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    emailError ||
                    messageError ||
                    !email.trim() ||
                    !message.trim()
                  }
                  className={`w-full font-medium px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    loading ||
                    emailError ||
                    messageError ||
                    !email.trim() ||
                    !message.trim()
                      ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-800 hover:bg-gray-100 border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                  }`}
                >
                  {loading ? "Enviando…" : "Enviar"}
                </button>

                <div
                  aria-live="polite"
                  className="text-sm min-h-[1.25rem] text-white"
                >
                  {err}
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h4 className="text-2xl font-bold text-white mb-4">¡Gracias!</h4>
              <p className="text-white text-lg">
                Tu mensaje ha sido enviado exitosamente. Te contactaremos
                pronto.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="border-b border-white" />
    </>
  );
};
