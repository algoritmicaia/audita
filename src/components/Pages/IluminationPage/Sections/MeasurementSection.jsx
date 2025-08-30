import React from "react";
import InputForm from "../../../Ui/InputForm"
import Section from "../../../Ui/Section"

export const MeasurementSection = ({isCollapsed, onToggle}) => {
  return (
    <>
      <Section
        title={"Datos de la medición"}
        isCollapsed={isCollapsed}
        onToggle={() => onToggle()}
      >
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <InputForm
                id="instrument_model_serial"
                type="text"
                labelText="Instrumento"
                placeholder="Marca, modelo, nro de serie"
              />
            </div>

            <div className="flex-1">
              <InputForm
                id="calibration_date"
                type="date"
                labelText="Fecha de calibración"
                placeholder="Ingresa la fecha de calibracion de tu equipo"
              />
            </div>
          </div>

          <InputForm
            id="methodology"
            useArea={true}
            labelText="Metodología utilizada"
            placeholder="Ingresa la metodología utilizada"
          />

          <InputForm
            id="measurement_date"
            type="date"
            labelText="Fecha de la medición"
          />

          <div className="space-y-4 flex gap-4">
            <div className="flex-1">
              <InputForm
                id="measurement_start_time"
                type="time"
                labelText="Hora de inicio de la medición"
              />
            </div>

            <div className="flex-1">
              <InputForm
                id="measurement_end_time"
                type="time"
                labelText="Hora de finalización"
              />
            </div>
          </div>

          <InputForm
            id="atmospheric_conditions"
            useArea={true}
            labelText="Condiciones atmosféricas"
          />
        </div>
      </Section>
    </>
  );
};
