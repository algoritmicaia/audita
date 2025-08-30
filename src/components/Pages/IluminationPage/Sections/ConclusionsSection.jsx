import React from "react";
import InputForm from "../../../Ui/InputForm"
import Section from "../../../Ui/Section"
import { useIluminationStore } from "../Storage/IluminationStorage";

export const ConclusionsSection = ({isCollapsed, onToggle}) => {
  const conclusions = useIluminationStore((state) => state.conclusions.conclusions);
  const recommendations = useIluminationStore((state) => state.conclusions.recommendations);

  const setConclusionsField = useIluminationStore((state) => state.setConclusionsField);

  const handleFieldChange = (field) => (e) => setConclusionsField(field, e.target.value);

  return (
    <>
      <Section
        title={"Conclusiones y recomendaciones"}
        isCollapsed={isCollapsed}
        onToggle={() => onToggle()}
      >
        <div className="space-y-4">
          <InputForm
            id="conclusions"
            useArea={true}
            labelText="Conclusiones"
            placeholder="Escribe tus conclusiones"
            value={conclusions}
            onChange={handleFieldChange('conclusions')}
          />

          <InputForm
            id="recommendations"
            useArea={true}
            labelText="Recomendaciones"
            placeholder="Escribe tus recomendaciones"
            value={recommendations}
            onChange={handleFieldChange('recommendations')}
          />
        </div>
      </Section>
    </>
  );
};
