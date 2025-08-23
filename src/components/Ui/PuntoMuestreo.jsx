import React from 'react'
import InputForm from './InputForm'
import SelectForm from './SelectForm'

export const PuntoMuestreo = ({register, index = 0}) => {

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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h1>Punto de muestreo {index + 1}</h1>
        <div className="flex gap-4 mb-6">
            <div className="flex-1">
                <InputForm
                id={`hora_${index}`}
                type="time"
                labelText="Hora"
                placeholder="Ingresa la hora del muestreo"
                required={true}
                register={register}
                />
            </div>
            <div className="flex-1">
                <InputForm
                id={`sector_${index}`}
                type="text"
                labelText="Sector"
                placeholder="Ingresa el nombre del sector"
                required={true}
                register={register}
                />
            </div>
            <div className="flex-1">
                <InputForm
                id={`seccion_${index}`}
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
                id={`tipo_iluminacion_${index}`}
                labelText="Tipo de iluminación"
                options={tiposIluminacion}
                required={true}
                register={register}
                />
            </div>
            <div className="flex-1">
            <SelectForm
                id={`tipo_fuente_${index}`}
                labelText="Tipo de fuente"
                options={tiposFuente}
                required={true}
                register={register}
                />
            </div>
            <div className="flex-1">
            <SelectForm
                id={`iluminacion_${index}`}
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
                id={`uniformidad_luminancia_${index}`}
                type="text"
                labelText="Uniformidad de luminancia"
                placeholder="Ingresa la uniformidad de luminancia"
                required={true}
                register={register}
                />
            </div>
            <div className="flex-1">
                <InputForm
                id={`valor_medio_${index}`}
                type="text"
                labelText="Valor medio (Lux)"
                placeholder="Ingresa el valor medio en Lux"
                required={true}
                register={register}
                />
            </div>
            <div className="flex-1">
                <InputForm
                id={`valor_requerido_${index}`}
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