import React from 'react'

export const Card = ({icon, text, type='primary'}) => {


  let divClass = null;
  let iconClass = null;

  if (type === 'primary'){
    divClass = "bg-white rounded-lg border border-blue-200 p-6 text-center"
    iconClass = "w-8 h-8 bg-green-800 rounded-full flex items-center justify-center"
  } else if (type === 'secondary') {
    divClass = "p-4 text-center min-h-[120px] flex flex-col justify-center"
    iconClass = "w-10 h-10 flex items-center justify-center mx-auto text-black"
  } else {
    divClass = "bg-white p-6 text-center"
    iconClass = "w-8 h-8 bg-black rounded-full flex items-center justify-center"
  }

  return (
    <div className={divClass}>
        {icon && (
          <div className="flex justify-center mb-3">
            <div className={iconClass}>
              {icon}
            </div>
          </div>
        )}
        <h3 className="text-gray-800 text-sm font-medium leading-tight">
          {text}
        </h3>
    </div>
  )
}
