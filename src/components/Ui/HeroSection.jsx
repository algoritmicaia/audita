import React from "react";

export const HeroSection = ({title, text, imagePath}) => {
  return (
    <section className="bg-white py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row items-center gap-4 lg:gap-12">
          {/* Texto a la izquierda */}
          <div className="flex-1 text-left">
            <h1 className="text-2xl lg:text-3xl font-bold text-blue-800 mb-4 lg:mb-6 leading-tight">
              {title}
            </h1>

            <p className="text-sm lg:text-lg text-gray-700 leading-relaxed">
             {text}
            </p>
          </div>

          {/* Imagen a la derecha */}
          <div className="flex-shrink-0 flex justify-end">
            <img
              src={imagePath}
              alt="Profesional con equipo de medición"
              className="w-32 lg:max-w-64 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
