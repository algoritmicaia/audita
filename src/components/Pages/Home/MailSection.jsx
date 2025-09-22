import React, { useState } from "react";

export const MailSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // El formulario se enviará automáticamente a FormSubmit
    // Mostramos el mensaje de éxito después de un breve delay
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <>
      {/* Bordes blancos superiores e inferiores */}
      <div className="border-t border-white"></div>

      {/* Sección principal con fondo verde oscuro */}
      <div className="bg-green-900 p-8 text-center">
        {/* Título principal */}
        <h2 className="text-3xl font-bold text-white mb-6">
          Tu participación es clave
        </h2>

        {/* Descripción */}
        <p className="text-white text-lg mb-8 max-w-3xl mx-auto">
          Al probar Audita nos ayudás a seguir desarrollando soluciones que
          simplifiquen el trabajo de los profesionales de Higiene y Seguridad en
          Argentina.
        </p>

        {/* Línea separadora */}
        <div className="w-16 h-0.5 bg-white mx-auto mb-8"></div>

        {/* Título del formulario */}
        <h3 className="text-xl font-bold text-white mb-8">
          Dejanos un mensaje con tu experiencia.
        </h3>

        {/* Formulario con FormSubmit */}
        <div className="max-w-md mx-auto">
          {!isSubmitted ? (
            <form 
              target="_blank" 
              action="https://formsubmit.co/algoritmicaia@gmail.com" 
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Campo de email */}
              <input 
                type="email" 
                name="email" 
                placeholder="Ingrese el correo electronico*" 
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors duration-200 text-gray-800" 
                required 
              />
              
              {/* Campo de mensaje */}
              <textarea 
                name="message" 
                placeholder="Dejanos un mensaje*" 
                rows={4}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors duration-200 resize-vertical min-h-[100px] text-gray-800" 
                required
              ></textarea>
              
              {/* Configuración de FormSubmit */}
              <input type="hidden" name="_captcha" value="true" />
              <input type="hidden" name="_subject" value="Nueva consulta desde Audita - Experiencia de usuario" />
              <input type="hidden" name="_autoresponse" value="¡Gracias por contactarnos! Hemos recibido tu mensaje sobre tu experiencia con Audita y te responderemos a la brevedad." />
              <input type="hidden" name="_next" value="https://audita.com" />
              
              {/* Botón de envío */}
              <button 
                type="submit" 
                className="w-full bg-white text-gray-800 hover:bg-gray-100 font-medium px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors duration-200"
              >
                Enviar
              </button>
            </form>
          ) : (
            /* Mensaje de éxito */
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

      {/* Borde blanco inferior */}
      <div className="border-b border-white"></div>
    </>
  );
};
