import React, { useState } from 'react';
import { Link } from 'react-router';
import { ModalTerms } from './ModalTerms';
import { ModalPrivacy } from './ModalPrivacy';

const Footer = () => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  return (
    <footer className="bg-gray-50 border-t border-b border-gray-300 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-start justify-between">
          {/* Left Section - Logo and Contact */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <img 
                src="/favicon-32x32.png" 
                alt="Audita Logo" 
                className="w-6 h-6"
              />
              <span className="text-lg font-bold text-blue-800">Audita</span>
            </div>
            <a 
              href="mailto:algoritmica@contact.com" 
              className="text-sm text-gray-600 underline hover:text-blue-600 transition-colors"
            >
              algoritmica@contact.com
            </a>
            <p className="text-xs text-gray-500">
              © 2025 Audita. Todos los derechos reservados.
            </p>
          </div>

          {/* Right Section - Legal Links */}
          <div className="flex flex-col space-y-1">
            <button 
              onClick={() => setIsPrivacyModalOpen(true)}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors text-left"
            >
              Política de privacidad
            </button>
            <button 
              onClick={() => setIsTermsModalOpen(true)}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors text-left"
            >
              Términos y condiciones de uso
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Política de Privacidad */}
      <ModalPrivacy
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Modal de Términos y Condiciones */}
      <ModalTerms
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </footer>
  )
}

export default Footer
