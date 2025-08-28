import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export const Section = ({title, children, isCollapsed, onToggle}) => {
  const handleCollapse = () => {
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <section className="mb-8">
        <h1 
          className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2 cursor-pointer transition-colors duration-200 flex items-center justify-between"
          onClick={handleCollapse}
        >
          {title}
          <span className="text-lg text-gray-500 transition-transform duration-200">
            {isCollapsed ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
          </span>
        </h1>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-none opacity-100'
        }`}>
          {children}
        </div>
    </section>
  )
}

export default Section