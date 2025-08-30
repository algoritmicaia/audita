import InputForm from "../../../Ui/InputForm";
import Section from "../../../Ui/Section";
import { useIluminationStore } from "../Storage/IluminationStorage";

export const CompanySection = ({ isCollapsed, onToggle }) => {
  
  const companyName = useIluminationStore((state) => state.company.companyName);
  const taxId = useIluminationStore((state) => state.company.taxId);
  const address = useIluminationStore((state) => state.company.address);
  const city = useIluminationStore((state) => state.company.city);
  const state = useIluminationStore((state) => state.company.state);
  const postalCode = useIluminationStore((state) => state.company.postalCode);
  const workingHours = useIluminationStore((state) => state.company.workingHours);
  const setCompanyField = useIluminationStore((state) => state.setCompanyField);

  const handleFieldChange = (field) => (e) => setCompanyField(field, e.target.value);


  return (
    <>
        <Section
          title={"Datos de la empresa"}
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
                value={companyName}
                onChange={handleFieldChange('companyName')}
              />
            </div>

            <div className="flex-1">
              <InputForm
                id="tax_id"
                type="number"
                labelText="CUIT"
                placeholder="Ingresa el cuit de la empresa"
                value={taxId}
                onChange={handleFieldChange('taxId')}

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
                value={address}
                onChange={handleFieldChange('address')}
              />
            </div>

            <div className="">
              <InputForm
                id="city"
                type="text"
                labelText="Localidad"
                placeholder="Ingresa la localidad de la empresa"
                value={city}
                onChange={handleFieldChange('city')}
              />
            </div>

            <div className="">
              <InputForm
                id="state"
                type="text"
                labelText="Provincia"
                placeholder="Ingresa la provincia de la empresa"
                value={state}
                onChange={handleFieldChange('state')}
              />
            </div>

            <div className="">
              <InputForm
                id="postal_code"
                type="text"
                labelText="CP"
                placeholder="Ingresa el código postal"
                value={postalCode}
                onChange={handleFieldChange('postalCode')}
              />
            </div>

            <div className="">
              <InputForm
                id="working_hours"
                useArea={true}
                labelText="Horarios/Turnos habituales de la empresa"
                placeholder="Ingresa los horarios de la empresa"
                value={workingHours}
                onChange={handleFieldChange('workingHours')}
              />
            </div>
          </div>
        </Section>
    </>
  );
};
