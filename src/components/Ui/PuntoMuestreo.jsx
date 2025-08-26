import React from 'react'
import InputForm from './InputForm'
import SelectForm from './SelectForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export const PuntoMuestreo = ({register, id, displayIndex = 1, onDelete, showDeleteButton = true}) => {

    const tiposIluminacion = [
        { value: "Natural", label: "Natural" },
        { value: "Artificial", label: "Artificial" },
        { value: "Mixta", label: "Mixta" }
      ];
    
      const tiposFuente = [
        { value: "Incandescente", label: "Incandescente" },
        { value: "Descarga", label: "Descarga" },
        { value: "Mixta", label: "Mixta" }
      ];
    
      const iluminaciones = [
        { value: "General", label: "General" },
        { value: "Localizada", label: "Localizada" },
        { value: "Mixta", label: "Mixta" }
      ];

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 relative">
        {/* Botón de eliminar */}
        {showDeleteButton && (
          <button
            type="button"
            onClick={handleDelete}
            className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-lg"
            title="Eliminar punto de muestreo"
          >
            <FontAwesomeIcon icon={faTimes} className="text-sm" />
          </button>
        )}
        
        <h1 className="pr-10">Punto de muestreo {displayIndex}</h1>
        <div className="flex gap-4 mb-6">
            <div className="flex-1">
                <InputForm
                id={`sampling_point_${id}_time`}
                type="time"
                labelText="Hora"
                placeholder="Ingresa la hora del muestreo"
                required={true}
                register={register}
                />
            </div>
            <div className="flex-1">
                <InputForm
                id={`sampling_point_${id}_sector`}
                type="text"
                labelText="Sector"
                placeholder="Ingresa el nombre del sector"
                required={true}
                register={register}
                />
            </div>
            <div className="flex-1">
                <InputForm
                id={`sampling_point_${id}_section`}
                type="text"
                labelText="Sección/tipo/puesto"
                placeholder="Ingresa el nombre de la seccion, tipo o puesto"
                required={true}
                register={register}
                />
            </div>
        </div>

        {/* iluminacion */}
        <div className="flex gap-4 mb-6">
            <div className="flex-1">
                <SelectForm
                id={`sampling_point_${id}_illumination_type`}
                labelText="Tipo de iluminación"
                options={tiposIluminacion}
                required={true}
                register={register}
                />
            </div>
            <div className="flex-1">
            <SelectForm
                id={`sampling_point_${id}_source_type`}
                labelText="Tipo de fuente"
                options={tiposFuente}
                required={true}
                register={register}
                />
            </div>
            <div className="flex-1">
            <SelectForm
                id={`sampling_point_${id}_illumination`}
                labelText="Iluminación"
                options={iluminaciones}
                required={true}
                register={register}
                />
            </div>
        </div>


        {/* valores  */}
        <div className="flex gap-4">
            <div className="flex-1">
                <InputForm
                id={`sampling_point_${id}_luminance_uniformity`}
                type="text"
                labelText="Uniformidad de luminancia"
                placeholder="Ingresa la uniformidad de luminancia"
                required={true}
                register={register}
                />
            </div>
            <div className="flex-1">
                <InputForm
                id={`sampling_point_${id}_average_value`}
                type="text"
                labelText="Valor medio (Lux)"
                placeholder="Ingresa el valor medio en Lux"
                required={true}
                register={register}
                />
            </div>
            <div className="flex-1">
                <InputForm
                id={`sampling_point_${id}_required_value`}
                type="text"
                labelText="Valor requerido"
                placeholder="Valor requerido legalmente"
                required={true}
                register={register}
                />
            </div>
        </div>
    </div>
  )
}

export default PuntoMuestreo