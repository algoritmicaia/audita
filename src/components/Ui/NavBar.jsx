import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCheckSquare, 
  faChartBar, 
  faUser, 
  faBuilding, 
  faHardHat, 
  faListCheck, 
  faCog, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons'

export const NavBar = () => {
  return (
    <nav className="bg-white h-screen w-64 shadow-lg flex flex-col">
      {/* Header/Logo */}
      <div className="p-4.5 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon 
            icon={faCheckSquare} 
            className="text-blue-600 text-2xl"
          />
          <span className="text-blue-800 font-bold text-xl">Audita</span>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-800'
                }`
              }
            >
              <FontAwesomeIcon icon={faChartBar} className="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/users/index" 
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-800'
                }`
              }
            >
              <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
              <span>Usuarios</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/plantas-sectores" 
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-800'
                }`
              }
            >
              <FontAwesomeIcon icon={faBuilding} className="w-5 h-5" />
              <span>Plantas y sectores</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/equipos-trabajo" 
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-800'
                }`
              }
            >
              <FontAwesomeIcon icon={faHardHat} className="w-5 h-5" />
              <span>Equipos de trabajo</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/orden-trabajo" 
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-800'
                }`
              }
            >
              <FontAwesomeIcon icon={faListCheck} className="w-5 h-5" />
              <span>Orden de trabajo</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/configuracion" 
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-800'
                }`
              }
            >
              <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
              <span>Configuración</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout Section */}
      <div className="p-2.5 border-t border-gray-200">
        <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200 w-full">
          <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </nav>
  )
}

export default NavBar
