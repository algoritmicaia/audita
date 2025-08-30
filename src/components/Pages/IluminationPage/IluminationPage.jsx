import React from "react";
import Header from "../../Ui/Header";
import Footer from "../../Ui/Footer";
import Button from "../../Ui/Button";
import { useEffect, useState } from "react";
import { HeroSection } from "../../Ui/HeroSection";
import { Card } from "../../Ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFile,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { CompanySection } from "./Sections/CompanySection";
import { ResponsibleSection } from "./Sections/ResponsibleSection";
import { MeasurementSection } from "./Sections/MeasurementSection";
import { ConclusionsSection } from "./Sections/ConclusionsSection";
import { useSectionsCollapse } from "./Hooks/useSectionsCollapse";
import { SamplingPointsSection } from "./Sections/SamplingPointsSection";

function IluminationForm() {
  const [sections, dispatch] = useSectionsCollapse();

  const downloadPDF = async () => {
    dispatch({ type: "expandAll" });

    // Pequeño delay para asegurar que las secciones se desplieguen antes de imprimir
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <>
      <Header title={"Audita"} />
      <div className="max-w-4xl mx-auto px-4 py-4">
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

          <div className="break-before-page"></div>

          {/* <MeasurementSection
            isCollapsed={sections.medicion}
            onToggle={() => dispatch({ type: "toggle", key: "medicion" })}
          /> */}

          <div className="break-before-page"></div>

          <SamplingPointsSection
            isCollapsed={sections.puntosMuestreo}
            onToggle={() => dispatch({ type: "toggle", key: "puntosMuestreo" })}
          />

          {/* <div className="break-inside-avoid">
            <ConclusionsSection
              registerWithAutoSave={registerWithAutoSave}
              isCollapsed={sections.conclusiones}
              onToggle={() => dispatch({ type: "toggle", key: "conclusiones" })}
            />
          </div> */}

          {/* Indicador de autoguardado */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 print:hidden">
              <Button type="submit" variant="primary" onClick={downloadPDF}>
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

export default IluminationForm;
