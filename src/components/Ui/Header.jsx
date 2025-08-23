import React from "react";

const Header = ({ title }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-4">
          {/* Aquí puedes agregar elementos adicionales como notificaciones, perfil de usuario, etc. */}
        </div>
      </div>
    </header>
  )
}

export default Header;
