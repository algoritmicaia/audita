import React from 'react'
import { ModalInfo } from './ModalInfo'

export const ModalTerms = ({isOpen, onClose}) => {
  return (
      <ModalInfo
        isOpen={isOpen}
        onClose={onClose}
        title="Términos y condiciones de uso"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            <strong>Última actualización:</strong> 07/09/2025
          </p>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Los presentes Términos y Condiciones regulan el acceso y uso de la plataforma Audita (en adelante, "la Plataforma") por parte de los usuarios. Al utilizar Audita, el usuario declara haber leído, comprendido y aceptado íntegramente estos Términos y Condiciones.
            </p>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">1. Objeto de la Plataforma</h4>
              <p className="text-sm text-gray-600">
                Audita es una herramienta digital destinada a facilitar la carga de datos y digitalización de protocolos reglamentarios exigidos por la normativa vigente en Higiene y Seguridad (ej. Res. SRT 84/12). La Plataforma permite completar formularios online, generar informes PDF y mantener un registro digital de los mismos.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">2. Usuario responsable</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• El uso de Audita está destinado exclusivamente a profesionales matriculados en Higiene y Seguridad.</li>
                <li>• El usuario es responsable de la veracidad, exactitud y completitud de la información cargada en los formularios, constituyendo dicha carga una declaración jurada.</li>
                <li>• Audita no se responsabiliza por errores, omisiones o falsedad en los datos proporcionados por los usuarios.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">3. Alcance del servicio</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Audita brinda una plataforma digital de apoyo administrativo y documental.</li>
                <li>• La responsabilidad técnica y legal del contenido de los informes recae únicamente en el profesional que los completa.</li>
                <li>• Los informes generados no sustituyen la obligación legal del profesional de garantizar la veracidad de los datos consignados ni las inspecciones que las autoridades competentes puedan realizar.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">4. Propiedad intelectual</h4>
              <p className="text-sm text-gray-600">
                Todos los derechos de propiedad intelectual de la Plataforma, incluyendo software, diseño, logotipos, marcas y contenidos, pertenecen a Audita. El usuario se compromete a no reproducir, copiar ni distribuir el contenido sin autorización previa.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">5. Uso indebido de la Plataforma</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• No utilizar la Plataforma con fines fraudulentos o ilegales.</li>
                <li>• No intentar acceder a información de otros usuarios.</li>
                <li>• No alterar ni modificar el software de la Plataforma.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">6. Limitación de responsabilidad</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Daños derivados de errores u omisiones en los datos cargados por los usuarios.</li>
                <li>• Interrupciones temporales del servicio por mantenimiento, fallas técnicas o causas de fuerza mayor.</li>
                <li>• El uso indebido o ilegal de los informes generados por parte de terceros.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">7. Modificaciones</h4>
              <p className="text-sm text-gray-600">
                Audita podrá modificar los presentes Términos y Condiciones en cualquier momento, notificando a los usuarios a través de la Plataforma o por correo electrónico. El uso posterior de la Plataforma implica la aceptación de dichas modificaciones.
              </p>
            </div>
          </div>
        </div>
      </ModalInfo>
  )
}
