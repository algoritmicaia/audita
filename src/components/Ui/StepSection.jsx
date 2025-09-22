import React from 'react'

export const StepSection = ({ stepNumber, description, imageSrc, imageAlt }) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 py-6">
      {/* Texto - encima en móvil, a la izquierda en escritorio */}
      <div className="w-full md:flex-1">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
          </div>
          <div className="flex-1">
            <p 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: `${stepNumber}. ${description}` }}
            />
          </div>
        </div>
      </div>

      {/* Imagen - debajo en móvil, a la derecha en escritorio */}
      <div className="w-full md:flex-1">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <img 
            src={imageSrc} 
            alt={imageAlt}
            className="w-full h-auto rounded-md"
          />
        </div>
      </div>
    </div>
  )
}
