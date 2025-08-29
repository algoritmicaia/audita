import React from 'react'
import InputForm from "../../../Ui/InputForm"
import Section from "../../../Ui/Section"

export const ResponsibleSection = ({registerWithAutoSave}) => {
  return (
    <Section 
    title={'Datos del responsable'} 
    // isCollapsed={sectionsCollapse.responsable}
    onToggle={() => toggleSection('responsable')}
    >
        <div className="space-y-4">
            <div className="flex gap-4">
                <div className="flex-1">
                    <InputForm
                        id="first_name"
                        type="text"
                        labelText="Nombre"
                        placeholder="Ingresa tu nombre"
                        required={true}
                        register={registerWithAutoSave}
                    />
                </div>
                <div className="flex-1">
                    <InputForm
                        id="last_name"
                        type="text"
                        labelText="Apellido"
                        placeholder="Ingresa tu apellido"
                        required={true}
                        register={registerWithAutoSave}
                    />

                </div>
            </div>

            <InputForm
                id="license_number"
                type="number"
                labelText="Matrícula"
                placeholder="Ingresa tu matricula profesional"
                required={true}
                register={registerWithAutoSave}
            />

        </div>
    </Section>
  )
}
