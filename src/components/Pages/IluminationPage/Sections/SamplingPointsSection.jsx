import React from "react";
import InputForm from "../../../Ui/InputForm"
import Section from "../../../Ui/Section"
import PuntoMuestreo from "../../../Ui/PuntoMuestreo"
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const SamplingPointsSection = ({registerWithAutoSave, isCollapsed, onToggle}) => {
  return (
    <>
      <Section
        title={"Puntos de muestreo"}
        isCollapsed={isCollapsed}
        onToggle={() => onToggle()}
      >
        {/* Contenedor scrolleable para los puntos de muestreo */}
        <div className="puntos-muestreo-container space-y-4 pr-2 mb-4">
          {puntosMuestreo.map((punto) => (
            <div
              key={punto.id}
              className={`transition-all duration-125 ease-out ${
                animatingItems.has(punto.id)
                  ? "opacity-0 transform -translate-y-4 scale-95"
                  : "opacity-100 transform translate-y-0 scale-100"
              }`}
            >
              <PuntoMuestreo
                register={registerWithAutoSave}
                id={punto.id}
                displayIndex={punto.displayIndex}
                onDelete={eliminarPuntoMuestreo}
              />
            </div>
          ))}

          <InputForm
            id="sampling_observations"
            useArea={true}
            labelText="Observaciones"
            required={true}
            register={registerWithAutoSave}
          />
        </div>

        {/* Botón para agregar más puntos de muestreo */}
        <div className="mt-6">
          <Button
            type="button"
            variant="success"
            onClick={agregarPuntoMuestreo}
            className="flex items-center gap-2 print:hidden"
          >
            <FontAwesomeIcon icon={faPlus} />
            Añadir punto de muestreo
          </Button>
        </div>
      </Section>
    </>
  );
};
