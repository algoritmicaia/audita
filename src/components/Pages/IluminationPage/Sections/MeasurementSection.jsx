import React from "react";
import InputForm from "../../../Ui/InputForm"
import Section from "../../../Ui/Section"
import { useIluminationStore } from "../Storage/IluminationStorage";

export const MeasurementSection = ({isCollapsed, onToggle}) => {
  const instrumentModelSerial = useIluminationStore((state) => state.measurement.instrumentModelSerial);
  const calibrationDate = useIluminationStore((state) => state.measurement.calibrationDate);
  const methodology = useIluminationStore((state) => state.measurement.methodology);
  const measurementDate = useIluminationStore((state) => state.measurement.measurementDate);
  const measurementStartTime = useIluminationStore((state) => state.measurement.measurementStartTime);
  const measurementEndTime = useIluminationStore((state) => state.measurement.measurementEndTime);
  const atmosphericConditions = useIluminationStore((state) => state.measurement.atmosphericConditions);

  const setMeasurementField = useIluminationStore((state) => state.setMeasurementField);

  const handleFieldChange = (field) => (e) => setMeasurementField(field, e.target.value);

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
                id="instrumentModelSerial"
                type="text"
                labelText="Instrumento"
                placeholder="Marca, modelo, nro de serie"
                value={instrumentModelSerial}
                onChange={handleFieldChange('instrumentModelSerial')}
              />
            </div>

            <div className="flex-1">
              <InputForm
                id="calibrationDate"
                type="date"
                labelText="Fecha de calibración"
                placeholder="Ingresa la fecha de calibracion de tu equipo"
                value={calibrationDate}
                onChange={handleFieldChange('calibrationDate')}
              />
            </div>
          </div>

          <InputForm
            id="methodology"
            useArea={true}
            labelText="Metodología utilizada"
            placeholder="Ingresa la metodología utilizada"
            value={methodology}
            onChange={handleFieldChange('methodology')}
          />

          <InputForm
            id="measurementDate"
            type="date"
            labelText="Fecha de la medición"
            value={measurementDate}
            onChange={handleFieldChange('measurementDate')}
          />

          <div className="space-y-4 flex gap-4">
            <div className="flex-1">
              <InputForm
                id="measurementStartTime"
                type="time"
                labelText="Hora de inicio de la medición"
                value={measurementStartTime}
                onChange={handleFieldChange('measurementStartTime')}
              />
            </div>

            <div className="flex-1">
              <InputForm
                id="measurementEndTime"
                type="time"
                labelText="Hora de finalización"
                value={measurementEndTime}
                onChange={handleFieldChange('measurementEndTime')}
              />
            </div>
          </div>

          <InputForm
            id="atmosphericConditions"
            useArea={true}
            labelText="Condiciones atmosféricas"
            value={atmosphericConditions}
            onChange={handleFieldChange('atmosphericConditions')}
          />
        </div>
      </Section>
    </>
  );
};
