import React from "react";
import Header from "../../Ui/Header";
import Footer from "../../Ui/Footer";
import Button from "../../Ui/Button";
import { HeroSection } from "../../Ui/HeroSection";
import { Card } from "../../Ui/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFile,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { CompanySection } from "./Sections/CompanySection";
import { MeasurementSection } from "./Sections/MeasurementSection";
import { ConclusionsSection } from "./Sections/ConclusionsSection";
import { useSectionsCollapse } from "./Hooks/useSectionsCollapse";
import { SamplingPointsSection } from "./Sections/SamplingPointsSection";
import { useIluminationStore } from "./Storage/IluminationStorage";
import { Analytics } from '@vercel/analytics/react';



function IluminationPage() {
  const [sections, dispatch] = useSectionsCollapse();
  const resetAllData = useIluminationStore((state) => state.resetAllData);

  const downloadPDF = async () => {
    dispatch({ type: "expandAll" });

    // Pequeño delay para asegurar que las secciones se desplieguen antes de imprimir
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleClear = () => {
    if (window.confirm("¿Estás seguro de que quieres limpiar todos los datos? Esta acción no se puede deshacer.")) {
      resetAllData();
    }
  };

  return (
    <>
      <Analytics />

      <div className="max-w-4xl mx-auto px-4 py-4">
        <Header />
        <HeroSection />

        {/* cards */}
        <div className="flex gap-6 py-4 print:hidden">
          <div className="flex-1">
            <Card
              icon={
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-white text-xl"
                />
              }
              text={"Cumplimiento normativo garantizado"}
            />
          </div>

          <div className="flex-1">
            <Card
              icon={
                <FontAwesomeIcon icon={faFile} className="text-white text-xl" />
              }
              text={"Registro digital, seguro y descargable"}
            />
          </div>
          <div className="flex-1">
            <Card
              icon={
                <FontAwesomeIcon
                  icon={faSignature}
                  className="text-white text-xl"
                />
              }
              text={"Ahorro de tiempo en tu práctica profesional"}
            />
          </div>
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

          <div className="flex justify-center items-center gap-4 pt-4 border-t border-gray-200">
            <div className="print:hidden">
              <Button variant="secondary" onClick={handleClear}>
                Limpiar
              </Button>
            </div>
            <div className="print:hidden">
              <Button variant="primary" onClick={downloadPDF}>
                Descargar PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default IluminationPage;
