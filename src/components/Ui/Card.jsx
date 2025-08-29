import React from 'react'

export const Card = ({icon, text}) => {
  return (
    <div className="bg-white rounded-lg border border-blue-200 p-6 text-center">
        {icon && (
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
        <h3 className="text-gray-700 text-sm font-medium leading-tight">
          {text}
        </h3>
    </div>
  )
}
