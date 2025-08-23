import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 p-6">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="font-medium">Author: AlgoritmicaIA</div>
        <div className="contact">
          <a href="mailto:algoritmica@contact.com" className="hover:text-blue-600 transition-colors">
            algoritmica@contact.com
          </a>
        </div>  
      </div>
    </footer>
  )
}

export default Footer
