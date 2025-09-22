import React, { useState } from "react";
import { Link } from "react-router";
import { ModalTerms } from "./ModalTerms";
import { ModalPrivacy } from "./ModalPrivacy";

const Footer = () => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  return (
    <footer className="print:hidden bg-gray-50 border-t border-b border-gray-300 py-8">
      {/* Left Section - Logo and Contact */}
      <div className="max-w-4xl mx-auto px-4 pb-4 items-center space-x-2">
        <img src="/audita.png" alt="Audita Logo" />
      </div>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col space-y-2">
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
  );
};

export default Footer;
