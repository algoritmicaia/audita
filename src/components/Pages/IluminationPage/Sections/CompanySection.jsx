import React from 'react'
import InputForm from "../../../Ui/InputForm"
import Section from "../../../Ui/Section"

export const CompanySection = ({registerWithAutoSave, isCollapsed, onToggle}) => {
  return (
    <>
        <Section 
            title={'Datos de la empresa'} 
            isCollapsed={isCollapsed}
            onToggle={() => onToggle()}
        >

            <div className="space-y-4 flex gap-4">
            <div className="flex-1">
                <InputForm
                id="company_name"
                type="text"
                labelText="Razón social"
                placeholder="Ingresa la razón social de la empresa"
                required={true}
                register={registerWithAutoSave}
                />
            </div>

            <div className="flex-1">
                <InputForm
                id="tax_id"
                type="number"
                labelText="CUIT"
                placeholder="Ingresa el cuit de la empresa"
                required={true}
                register={registerWithAutoSave}
                />
            </div>
            </div>

            <div className="space-y-4 gap-4">
            <div className="">
                <InputForm
                id="address"
                type="text"
                labelText="Dirección"
                placeholder="Ingresa la dirección de la empresa"
                required={true}
                register={registerWithAutoSave}
                />
            </div>

            <div className="">
                <InputForm
                id="city"
                type="text"
                labelText="Localidad"
                placeholder="Ingresa la localidad de la empresa"
                required={true}
                register={registerWithAutoSave}
                />
            </div>

            <div className="">
                <InputForm
                id="state"
                type="text"
                labelText="Provincia"
                placeholder="Ingresa la provincia de la empresa"
                required={true}
                register={registerWithAutoSave}
                />
            </div>

            <div className="">
                <InputForm
                id="postal_code"
                type="text"
                labelText="CP"
                placeholder="Ingresa el código postal"
                required={true}
                register={registerWithAutoSave}
                />
            </div>

            <div className="">
                <InputForm
                id="working_hours"
                useArea={true}
                labelText="Horarios/Turnos habituales de la empresa"
                placeholder="Ingresa los horarios de la empresa"
                required={true}
                register={registerWithAutoSave}
                />
            </div>
            </div>
        </Section>
    </>
  )
}
