import React from "react";
import Header from "../../Ui/Header";
import { HeroSection } from "../../Ui/HeroSection";
import { Card } from "../../Ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFile,
  faSignature,
  fa1,
  fa2,
  fa3,
  fa4,
  faArrowRight,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { TitleWithParagraph } from "../../Ui/TitleWithParagraph";
import { StepSection } from "../../Ui/StepSection";
import Button from "../../Ui/Button";
import Footer from "../../Ui/Footer";
import { MailSection } from "./MailSection";

export const Home = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-4">
        <Header />
        <HeroSection
          title="Con Audita, simplificamos tus protocolos de higiene y seguridad"
          text="Te invitamos a probar nuestra solución que digitaliza los
protocolos reglamentarios y ayuda a agilizar la carga de datos
para presentar en tu empresa."
          imagePath="/lic.png"
        />

        <TitleWithParagraph
          title={"¿Cómo te ayuda Audita en tu inspección?"}
          text={
            "Durante una inspección en una empresa, el profesional de higiene y seguridad debe realizar mediciones, completar el formulario del protocolo reglamentario y entregar un informe final. Audita acompaña en ese momento del proceso: ingresás los de las mediciones en el formulario digital y el sistema genera automáticamente el PDF."
          }
        />

        {/* cards */}
        <div className="flex flex-col md:flex-row gap-6 py-4 print:hidden">
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
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        <TitleWithParagraph
          title={
            "Digitalizar tu protocolo es simple y rápido, solo seguí estos pasos:"
          }
          text={""}
        />

        <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 py-6 print:hidden">
          {/* Layout horizontal para pantallas grandes */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex-1">
              <Card
                icon={
                  <FontAwesomeIcon icon={fa1} className="text-black text-lg" />
                }
                text={"Accedé al formulario online"}
                type="secondary"
              />
            </div>

            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-green-800 text-2xl"
              />
            </div>

            <div className="flex-1">
              <Card
                icon={
                  <FontAwesomeIcon icon={fa2} className="text-black text-lg" />
                }
                text={"Ingresá los datos de las mediciones"}
                type="secondary"
              />
            </div>

            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-green-800 text-2xl"
              />
            </div>

            <div className="flex-1">
              <Card
                icon={
                  <FontAwesomeIcon icon={fa3} className="text-black text-lg" />
                }
                text={"Descargá tu informe PDF"}
                type="secondary"
              />
            </div>

            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-green-800 text-2xl"
              />
            </div>

            <div className="flex-1">
              <Card
                icon={
                  <FontAwesomeIcon icon={fa4} className="text-black text-lg" />
                }
                text={"Firmalo de forma digital"}
                type="secondary"
              />
            </div>
          </div>

          {/* Layout vertical para pantallas pequeñas */}
          <div className="flex flex-col items-center gap-4 md:hidden">
            <div className="w-full">
              <Card
                icon={
                  <FontAwesomeIcon icon={fa1} className="text-black text-lg" />
                }
                text={"Accedé al formulario online"}
                type="secondary"
              />
            </div>

            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={faArrowDown}
                className="text-green-800 text-2xl"
              />
            </div>

            <div className="w-full">
              <Card
                icon={
                  <FontAwesomeIcon icon={fa2} className="text-black text-lg" />
                }
                text={"Ingresá los datos de las mediciones"}
                type="secondary"
              />
            </div>

            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={faArrowDown}
                className="text-green-800 text-2xl"
              />
            </div>

            <div className="w-full">
              <Card
                icon={
                  <FontAwesomeIcon icon={fa3} className="text-black text-lg" />
                }
                text={"Descargá tu informe PDF"}
                type="secondary"
              />
            </div>

            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={faArrowDown}
                className="text-green-800 text-2xl"
              />
            </div>

            <div className="w-full">
              <Card
                icon={
                  <FontAwesomeIcon icon={fa4} className="text-black text-lg" />
                }
                text={"Firmalo de forma digital"}
                type="secondary"
              />
            </div>
          </div>
        </div>

        {/* Botón Comenzar ahora */}
        <div className="flex flex-col items-center py-6">
          <Button
            variant="success"
            to="/ilumination-protocol"
            className="mb-3 font-semibold px-8 py-3"
          >
            Comenzar ahora
          </Button>
          <p className="text-xs text-gray-500 text-center max-w-md">
            *Esta primera versión incluye únicamente el formulario del Protocolo
            de Medición de Iluminación establecido en la Resolución SRT 84/2012.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        <TitleWithParagraph
          title={"¿Cómo firmar digitalmente el informe?"}
          text={
            "Podés usar herramientas gratuitas como <a href='https://www.ilovepdf.com/es/firmar-pdf' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>iLovePDF</a>. A continuación te explicaremos como hacerlo para que puedas presentarlo firmado:"
          }
        />

        {/* Ejemplo de uso del componente StepSection */}
        <StepSection
          stepNumber="1"
          description="Accedé a <a href='https://www.ilovepdf.com/es/firmar-pdf' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>iLovePDF</a> y seleccioná la opción 'Firmar PDF'. Luego arrastrá tu archivo o hacé clic en 'Seleccionar archivo PDF' para subirlo."
          imageSrc="/1.png"
          imageAlt="Pantalla de iLovePDF mostrando la opción para subir PDF"
        />

        <StepSection
          stepNumber="2"
          description="Seleccioná la opción “Solo yo”."
          imageSrc="/2.png"
          imageAlt="Pantalla de iLovePDF mostrando la opción para subir PDF"
        />

        <StepSection
          stepNumber="3"
          description="Dibujá o cargá tu firma digital y presioná el botón “Aplicar”."
          imageSrc="/3.png"
          imageAlt="Pantalla de iLovePDF mostrando la opción para subir PDF"
        />

        <StepSection
          stepNumber="4"
          description="Arrastrá tu firma al documento. Tambien podrás arrastrar campos opcionales como tu nombre, fecha, etc."
          imageSrc="/4.png"
          imageAlt="Pantalla de iLovePDF mostrando la opción para subir PDF"
        />

        <StepSection
          stepNumber="5"
          description="Luego, presioná el botón “Firmar” y se descargará el documento firmado."
          imageSrc="/5.png"
          imageAlt="Pantalla de iLovePDF mostrando la opción para subir PDF"
        />
      </div>
      <MailSection />

      <Footer />
    </>
  );
};
