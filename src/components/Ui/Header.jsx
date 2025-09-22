import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="bg-white">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img 
            src="/audita.png" 
            alt="audita" 
            className="h-10 w-auto"
          />
        </Link>
        <div className="flex items-center space-x-4">
          {/* Aquí puedes agregar elementos adicionales como notificaciones, perfil de usuario, etc. */}
        </div>
      </div>
    </header>
  )
}

export default Header;
