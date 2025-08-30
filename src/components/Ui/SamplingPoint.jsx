import React from "react";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useIluminationStore } from "../Pages/IluminationPage/Storage/IluminationStorage";

export const SamplingPoint = ({ id, displayIndex = 1, onDelete }) => {
  const samplingPoints = useIluminationStore(
    (state) => state.samplingPoints.samplingPoints
  );
  const setSamplingPointField = useIluminationStore(
    (state) => state.setSamplingPointField
  );

  // Encontrar el punto actual
  const currentPoint = samplingPoints.find((point) => point.id === id) || {};

  const handleFieldChange = (field) => (e) => {
    setSamplingPointField(id, field, e.target.value);
  };

  const handleSelectChange = (field) => (e) => {
    setSamplingPointField(id, field, e.target.value);
  };

  const tiposIluminacion = [
    { value: "Natural", label: "Natural" },
    { value: "Artificial", label: "Artificial" },
    { value: "Mixta", label: "Mixta" },
  ];

  const tiposFuente = [
    { value: "Incandescente", label: "Incandescente" },
    { value: "Descarga", label: "Descarga" },
    { value: "Mixta", label: "Mixta" },
  ];

  const iluminaciones = [
    { value: "General", label: "General" },
    { value: "Localizada", label: "Localizada" },
    { value: "Mixta", label: "Mixta" },
  ];

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 relative break-inside-avoid">
      {/* Botón de eliminar */}
      <button
        type="button"
        onClick={handleDelete}
        className="absolute top-3 right-3 w-8 h-8 text-red-500 hover:text-red-600 flex items-center justify-center transition-colors duration-200 print:hidden"
        title="Eliminar punto de muestreo"
      >
        <FontAwesomeIcon icon={faTimes} className="text-sm" />
      </button>

      <h1 className="pr-10">Punto de muestreo {displayIndex}</h1>

      {/* Sector - ancho completo */}
      <div className="mb-4">
        <InputForm
          id={`sampling_point_${id}_sector`}
          type="text"
          labelText="Sector"
          placeholder="Ingresá el nombre del sector"
          value={currentPoint.sector || ""}
          onChange={handleFieldChange("sector")}
        />
      </div>

      {/* Sección/tipo/puesto - ancho completo */}
      <div className="mb-4">
        <InputForm
          id={`sampling_point_${id}_section`}
          type="text"
          labelText="Sección/tipo/puesto"
          placeholder="Ingresá la sección, tipo o puesto"
          value={currentPoint.section || ""}
          onChange={handleFieldChange("section")}
        />
      </div>

      {/* Hora + Tipo de iluminación - lado a lado */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <InputForm
            id={`sampling_point_${id}_time`}
            type="time"
            labelText="Hora"
            placeholder="Ingresá la hora del muestreo"
            value={currentPoint.time || ""}
            onChange={handleFieldChange("time")}
          />
        </div>
        <div className="flex-1">
          <SelectForm
            id={`sampling_point_${id}_illumination_type`}
            labelText="Tipo de iluminación"
            options={tiposIluminacion}
            value={currentPoint.illuminationType || ""}
            onChange={handleSelectChange("illuminationType")}
          />
        </div>
      </div>

      {/* Tipo de fuente + Iluminación - lado a lado */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <SelectForm
            id={`sampling_point_${id}_source_type`}
            labelText="Tipo de fuente"
            options={tiposFuente}
            value={currentPoint.sourceType || ""}
            onChange={handleSelectChange("sourceType")}
          />
        </div>
        <div className="flex-1">
          <SelectForm
            id={`sampling_point_${id}_illumination`}
            labelText="Iluminación"
            options={iluminaciones}
            value={currentPoint.illumination || ""}
            onChange={handleSelectChange("illumination")}
          />
        </div>
      </div>

      {/* Uniformidad de iluminancia + Valor medio - lado a lado */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <InputForm
            id={`sampling_point_${id}_luminance_uniformity`}
            type="text"
            labelText="Uniformidad de iluminancia"
            placeholder="Ingresá la uniformidad"
            value={currentPoint.luminanceUniformity || ""}
            onChange={handleFieldChange("luminanceUniformity")}
          />
        </div>
        <div className="flex-1">
          <InputForm
            id={`sampling_point_${id}_average_value`}
            type="text"
            labelText="Valor medio (Lux)"
            placeholder="Ingresá el valor medio"
            value={currentPoint.averageValue || ""}
            onChange={handleFieldChange("averageValue")}
          />
        </div>
      </div>

      {/* Valor requerido - ancho completo */}
      <div className="mb-4">
        <InputForm
          id={`sampling_point_${id}_required_value`}
          type="text"
          labelText="Valor requerido según anexo"
          placeholder="Ingresá el valor requerido"
          value={currentPoint.requiredValue || ""}
          onChange={handleFieldChange("requiredValue")}
        />
      </div>
    </div>
  );
};

export default SamplingPoint;
