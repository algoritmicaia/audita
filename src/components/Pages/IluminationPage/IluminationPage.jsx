import React, { useState } from "react";
import Header from "../../Ui/Header";
import Footer from "../../Ui/Footer";
import Button from "../../Ui/Button";
import { HeroSection } from "../../Ui/HeroSection";
import { CompanySection } from "./Sections/CompanySection";
import { MeasurementSection } from "./Sections/MeasurementSection";
import { ConclusionsSection } from "./Sections/ConclusionsSection";
import { useSectionsCollapse } from "./Hooks/useSectionsCollapse";
import { SamplingPointsSection } from "./Sections/SamplingPointsSection";
import { useIluminationStore } from "./Storage/IluminationStorage";
import { Analytics } from "@vercel/analytics/react";
import { ModalPrivacy } from "../../Ui/ModalPrivacy";

function IluminationPage() {
  const [sections, dispatch] = useSectionsCollapse();
  const resetAllData = useIluminationStore((state) => state.resetAllData);
  const [dataCorrect, setDataCorrect] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const downloadPDF = async () => {
    dispatch({ type: "expandAll" });

    // Pequeño delay para asegurar que las secciones se desplieguen antes de imprimir
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleClear = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres limpiar todos los datos? Esta acción no se puede deshacer."
      )
    ) {
      resetAllData();
    }
  };

  return (
    <>
      <Analytics />

      <div className="max-w-4xl mx-auto px-4 py-4">
        <Header />
        <HeroSection />



        <div className="flex justify-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 cursor-pointer transition-colors duration-200 flex items-center justify-between">
            Completá el protocolo de medición de iluminación en el ambiente
          </h1>

        </div>

        <div className="py-4">
          <CompanySection
            isCollapsed={sections.empresa}
            onToggle={() => dispatch({ type: "toggle", key: "empresa" })}
          />

          <MeasurementSection
            isCollapsed={sections.medicion}
            onToggle={() => dispatch({ type: "toggle", key: "medicion" })}
          />

          <div className="break-before-page"></div>

          <SamplingPointsSection
            isCollapsed={sections.puntosMuestreo}
            onToggle={() => dispatch({ type: "toggle", key: "puntosMuestreo" })}
          />

          <div className="break-inside-avoid">
            <ConclusionsSection
              isCollapsed={sections.conclusiones}
              onToggle={() => dispatch({ type: "toggle", key: "conclusiones" })}
            />
          </div>

          {/* Declaración jurada */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Declaración jurada</h3>
            
            <div className="space-y-3 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={dataCorrect}
                  onChange={(e) => setDataCorrect(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  Declaro que los datos consignados son correctos y corresponden a una medición real
                </span>
              </label>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  Acepto la{" "}
                  <button 
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="text-blue-600 underline hover:text-blue-800 transition-colors"
                  >
                    Política de Privacidad
                  </button>
                  {" "}y el uso de mis datos para la generación del informe.
                </span>
              </label>
            </div>

            {/* Botones alineados a la izquierda */}
            <div className="flex items-center gap-4 ml-7">
              <div className="print:hidden">
                <Button variant="secondary" onClick={handleClear}>
                  Limpiar campos
                </Button>
              </div>
              <div className="print:hidden">
                <Button 
                  variant="success" 
                  onClick={downloadPDF}
                  disabled={!dataCorrect || !privacyAccepted}
                >
                  Generar informe PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal de Política de Privacidad */}
      <ModalPrivacy
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </>
  );
}

export default IluminationPage;
