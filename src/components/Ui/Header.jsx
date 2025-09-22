import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img 
            src="/favicon-32x32.png" 
            alt="audita" 
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-semibold text-gray-800">Audita</h1>
        </Link>
        <div className="flex items-center space-x-4">
          {/* Aquí puedes agregar elementos adicionales como notificaciones, perfil de usuario, etc. */}
        </div>
      </div>
    </header>
  )
}

export default Header;
