import React from 'react';

const Input = ({ className = '', ...props }) => {
  return (
    <div className={`relative ${className}`}>
      <input 
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors duration-200" 
        {...props}
      />
    </div>
  );
};

export default Input;

