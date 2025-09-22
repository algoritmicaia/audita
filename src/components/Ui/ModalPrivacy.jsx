import React from 'react'
import { ModalInfo } from './ModalInfo'

export const ModalPrivacy = ({isOpen, onClose}) => {
  return (
      <ModalInfo
        isOpen={isOpen}
        onClose={onClose}
        title="Política de privacidad"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            <strong>Última actualización:</strong> 07/09/2025
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">1. Uso exclusivo de la información</h4>
              <p className="text-sm text-gray-600 mb-2">
                Los datos que el usuario ingrese en los formularios tienen como único propósito la generación del protocolo digital en formato PDF.
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Una vez generado el informe, la información no se almacena en nuestros servidores.
              </p>
              <p className="text-sm text-gray-600">
                No realizamos copias, perfiles, bases de datos ni utilizamos la información para otros fines.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">2. No almacenamiento de datos</h4>
              <p className="text-sm text-gray-600 mb-2">
                Audita funciona como una herramienta de procesamiento inmediato.
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Los datos ingresados existen únicamente durante el tiempo necesario para generar el informe solicitado.
              </p>
              <p className="text-sm text-gray-600">
                Finalizado ese proceso, la información no queda guardada en la plataforma.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">3. Responsabilidad del usuario</h4>
              <p className="text-sm text-gray-600">
                El usuario es el único responsable de la veracidad y exactitud de los datos que ingrese en los formularios, los cuales constituyen una declaración jurada profesional según la normativa vigente.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">4. Seguridad</h4>
              <p className="text-sm text-gray-600">
                Aunque los datos no se almacenan, durante el proceso de carga y generación del informe se implementan medidas de seguridad para proteger la confidencialidad de la información (conexiones seguras y cifrado de la comunicación).
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">5. Consentimiento informado</h4>
              <p className="text-sm text-gray-600">
                El uso de la plataforma implica la aceptación de la presente Política de Privacidad. Al completar un formulario, el usuario comprende y acepta que Audita no guardará ni reutilizará sus datos en ningún momento.
              </p>
            </div>
          </div>
        </div>
      </ModalInfo>
  )
}
