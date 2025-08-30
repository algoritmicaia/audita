import React, { useState, useEffect } from "react";
import InputForm from "../../../Ui/InputForm"
import Section from "../../../Ui/Section"
import PuntoMuestreo from "../../../Ui/SamplingPoint"
import Button from "../../../Ui/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useIluminationStore } from "../Storage/IluminationStorage";

export const SamplingPointsSection = ({isCollapsed, onToggle}) => {
  const samplingPoints = useIluminationStore((state) => state.samplingPoints.samplingPoints);
  const observations = useIluminationStore((state) => state.samplingPoints.observations);
  const addSamplingPoint = useIluminationStore((state) => state.addSamplingPoint);
  const removeSamplingPoint = useIluminationStore((state) => state.removeSamplingPoint);
  const setSamplingObservations = useIluminationStore((state) => state.setSamplingObservations);
  
  function eliminarPuntoMuestreo(pointId){
    removeSamplingPoint(pointId);
  }

  const handleObservationsChange = (e) => {
    setSamplingObservations(e.target.value);
  };

  // Estados locales para la gestión de puntos de muestreo
  return (
    <>
      <Section
        title={"Puntos de muestreo"}
        isCollapsed={isCollapsed}
        onToggle={() => onToggle()}
      >
        {/* Contenedor scrolleable para los puntos de muestreo */}
        <div className="puntos-muestreo-container space-y-4 pr-2 mb-4">
          {samplingPoints.map((punto) => (
            <div
              key={punto.id}
            >
              <PuntoMuestreo
                id={punto.id}
                displayIndex={punto.displayIndex}
                onDelete={() => eliminarPuntoMuestreo(punto.id)}
              />
            </div>
          ))}

          <InputForm
            id="sampling_observations"
            useArea={true}
            labelText="Observaciones"
            value={observations}
            onChange={handleObservationsChange}
          />
        </div>

        {/* Botón para agregar más puntos de muestreo */}
        <div className="mt-6">
          <Button
            type="button"
            variant="success"
            onClick={addSamplingPoint}
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
