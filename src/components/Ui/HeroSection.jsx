import React from 'react'

export const HeroSection = () => {
  return (
    <section className="bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row items-center gap-4 lg:gap-12">
          {/* Texto a la izquierda */}
          <div className="flex-1 text-left">
            <h1 className="text-xl lg:text-3xl font-bold text-blue-800 mb-4 lg:mb-6 leading-tight">
              Con Audita, simplificamos tus protocolos de higiene y seguridad
            </h1>
            
            <p className="text-sm lg:text-lg text-gray-700 leading-relaxed">
              Te invitamos a probar nuestra solución que digitaliza los protocolos reglamentarios y ayuda a agilizar la carga de datos para presentar en tu empresa.
            </p>
          </div>

          {/* Imagen a la derecha */}
          <div className="flex-shrink-0 flex justify-end">
            <img 
              src="/lic.png" 
              alt="Profesional con equipo de medición" 
              className="w-32 lg:max-w-64 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
