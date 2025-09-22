import React from 'react'

export const StepSection = ({ stepNumber, description, imageSrc, imageAlt }) => {
  return (
    <div className="flex items-start gap-8 py-6">
      {/* Texto a la izquierda */}
      <div className="flex-1">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
          </div>
          <div className="flex-1">

            <p className="text-gray-700 leading-relaxed">
              {stepNumber}. {description}
            </p>
          </div>
        </div>
      </div>

      {/* Imagen a la derecha */}
      <div className="flex-1">
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
