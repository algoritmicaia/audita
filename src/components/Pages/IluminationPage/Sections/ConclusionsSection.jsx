import React from "react";
import InputForm from "../../../Ui/InputForm"
import Section from "../../../Ui/Section"

export const ConclusionsSection = ({registerWithAutoSave}) => {
  return (
    <>
      <Section
        title={"Conclusiones y recomendaciones"}
        // isCollapsed={sectionsCollapse.conclusiones}
        onToggle={() => toggleSection("conclusiones")}
      >
        <div className="space-y-4">
          <InputForm
            id="conclusions"
            useArea={true}
            labelText="Conclusiones"
            placeholder="Escribe tus conclusiones"
            required={true}
            register={registerWithAutoSave}
          />

          <InputForm
            id="recommendations"
            useArea={true}
            labelText="Recomendaciones"
            placeholder="Escribe tus recomendaciones"
            required={true}
            register={registerWithAutoSave}
          />
        </div>
      </Section>
    </>
  );
};
