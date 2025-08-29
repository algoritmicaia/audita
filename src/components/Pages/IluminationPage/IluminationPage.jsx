import React from "react";
import Header from "../../Ui/Header";
import Footer from "../../Ui/Footer";
import Form from "../../Ui/Form";
import Button from "../../Ui/Button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { processFormData } from "../../../utils";
import { HeroSection } from "../../Ui/HeroSection";
import { Card } from "../../Ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFile,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { CompanySection } from "./Sections/CompanySection";
import { ResponsibleSection } from "./Sections/ResponsibleSection";
import { MeasurementSection } from "./Sections/MeasurementSection";
import { ConclusionsSection } from "./Sections/ConclusionsSection";
import { useSectionsCollapse } from "./Hooks/useSectionsCollapse"; 
import { SamplingPointsSection } from "./Sections/SamplingPointsSection";

function IluminationForm() {
  const [sections, dispatch] = useSectionsCollapse();



  const { register, handleSubmit, getValues, setValue } = useForm();
  const [puntosMuestreo, setPuntosMuestreo] = useState([]);
  const [animatingItems, setAnimatingItems] = useState(new Set()); // Para controlar animaciones
  const [nextId, setNextId] = useState(0); // Para generar IDs únicos
  const [isAutoSaving, setIsAutoSaving] = useState(false); // Estado para mostrar feedback de autoguardado
  const [isLoading, setIsLoading] = useState(true); // Estado para mostrar loading mientras se cargan los datos

  // Función para obtener la fecha actual en formato YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Función para obtener la hora actual en formato HH:MM
  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  // Función para establecer valores por defecto de fecha y hora
  const setDefaultDateTimeValues = () => {
    const currentDate = getCurrentDate();
    const currentTime = getCurrentTime();

    // Establecer fecha actual para campos de fecha
    setValue("calibration_date", currentDate);
    setValue("measurement_date", currentDate);

    // Establecer hora actual para campos de tiempo
    setValue("measurement_start_time", currentTime);
    setValue("measurement_end_time", currentTime);
  };

  useEffect(() => {
    const loadExistingData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/ilumination_protocol", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Obteniendo datos del servidor");
          console.log(data);
          // Si hay datos existentes, poblar los campos del formulario
          if (data && data.result !== "ok") {
            // Datos de la empresa
            if (data.company_name) setValue("company_name", data.company_name);
            if (data.tax_id) setValue("tax_id", data.tax_id);
            if (data.address) setValue("address", data.address);
            if (data.city) setValue("city", data.city);
            if (data.state) setValue("state", data.state);
            if (data.postal_code) setValue("postal_code", data.postal_code);
            if (data.working_hours)
              setValue("working_hours", data.working_hours);

            // Datos del responsable
            if (data.first_name) setValue("first_name", data.first_name);
            if (data.last_name) setValue("last_name", data.last_name);
            if (data.license_number)
              setValue("license_number", data.license_number);

            // Datos de la medición
            if (data.instrument_model_serial)
              setValue("instrument_model_serial", data.instrument_model_serial);
            if (data.calibration_date)
              setValue("calibration_date", data.calibration_date);
            if (data.methodology) setValue("methodology", data.methodology);
            if (data.measurement_date)
              setValue("measurement_date", data.measurement_date);
            if (data.measurement_start_time)
              setValue("measurement_start_time", data.measurement_start_time);
            if (data.measurement_end_time)
              setValue("measurement_end_time", data.measurement_end_time);
            if (data.atmospheric_conditions)
              setValue("atmospheric_conditions", data.atmospheric_conditions);

            // Observaciones de puntos de muestreo
            if (data.sampling_observations)
              setValue("sampling_observations", data.sampling_observations);

            // Conclusiones y recomendaciones
            if (data.conclusions) setValue("conclusions", data.conclusions);
            if (data.recommendations)
              setValue("recommendations", data.recommendations);

            // Cargar puntos de muestreo si existen
            if (data.sampling_points && data.sampling_points.length > 0) {
              const puntos = data.sampling_points.map((punto, index) => ({
                id: index,
                displayIndex: index + 1,
              }));
              setPuntosMuestreo(puntos);
              setNextId(puntos.length);

              // Poblar los campos de cada punto de muestreo
              data.sampling_points.forEach((punto, index) => {
                if (punto.time)
                  setValue(`sampling_point_${index}_time`, punto.time);
                if (punto.sector)
                  setValue(`sampling_point_${index}_sector`, punto.sector);
                if (punto.section)
                  setValue(`sampling_point_${index}_section`, punto.section);
                if (punto.illumination_type)
                  setValue(
                    `sampling_point_${index}_illumination_type`,
                    punto.illumination_type
                  );
                if (punto.source_type)
                  setValue(
                    `sampling_point_${index}_source_type`,
                    punto.source_type
                  );
                if (punto.illumination)
                  setValue(
                    `sampling_point_${index}_illumination`,
                    punto.illumination
                  );
                if (punto.luminance_uniformity)
                  setValue(
                    `sampling_point_${index}_luminance_uniformity`,
                    punto.luminance_uniformity
                  );
                if (punto.average_value)
                  setValue(
                    `sampling_point_${index}_average_value`,
                    punto.average_value
                  );
                if (punto.required_value)
                  setValue(
                    `sampling_point_${index}_required_value`,
                    punto.required_value
                  );
              });
            }
          } else {
            // Si no hay datos existentes, establecer valores por defecto
            setDefaultDateTimeValues();
          }
        } else {
          // Si no hay respuesta exitosa, establecer valores por defecto
          setDefaultDateTimeValues();
        }
      } catch (error) {
        console.error("Error cargando datos existentes:", error);
        // En caso de error, establecer valores por defecto
        setDefaultDateTimeValues();
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingData();
  }, [setValue]);

  const sendData = (data) => {
    console.log(data);

    // Procesar los datos para estructurar los puntos de muestreo
    const processedData = processFormData(data, puntosMuestreo);

    fetch("/api/ilumination_protocol", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(processedData),
    });
  };

  // Función de autoguardado
  const autoSave = async () => {
    if (isAutoSaving) return; // Evitar múltiples llamadas simultáneas

    setIsAutoSaving(true);

    try {
      const formData = getValues(); // Obtiene todos los valores del formulario

      // Procesar los datos para estructurar los puntos de muestreo
      const processedData = processFormData(formData, puntosMuestreo);

      console.log("Autoguardando...");

      // Enviar los datos al servidor (puedes usar el mismo endpoint o crear uno específico para autoguardado)
      const response = await fetch("/api/ilumination_protocol", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        console.log("Autoguardado exitoso");
      } else {
        console.error("Error en autoguardado:", response.statusText);
      }
    } catch (error) {
      console.error("Error en autoguardado:", error);
    } finally {
      setIsAutoSaving(false);
    }
  };

  // Wrapper para register que incluye autoguardado en onBlur
  const registerWithAutoSave = (name, options = {}) => {
    const registeredField = register(name, options);

    return {
      ...registeredField,
      onBlur: (e) => {
        // Llamar el onBlur original si existe
        if (registeredField.onBlur) {
          registeredField.onBlur(e);
        }
        // Ejecutar autoguardado con un pequeño delay para asegurar que el valor se actualice
        setTimeout(() => {
          autoSave();
        }, 100);
      },
    };
  };

  const agregarPuntoMuestreo = () => {
    const newId = nextId;
    const newDisplayIndex = puntosMuestreo.length + 1;
    const newPunto = { id: newId, displayIndex: newDisplayIndex };

    setPuntosMuestreo((prev) => [...prev, newPunto]);
    setNextId((prev) => prev + 1);

    // Establecer hora actual por defecto para el nuevo punto de muestreo
    const currentTime = getCurrentTime();
    setValue(`sampling_point_${newId}_time`, currentTime);

    // Agregar el nuevo item a la lista de animaciones
    setAnimatingItems((prev) => new Set([...prev, newId]));

    // Remover la animación después de 500ms
    setTimeout(() => {
      setAnimatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(newId);
        return newSet;
      });
    }, 500);
  };

  const eliminarPuntoMuestreo = async (idToDelete) => {
    // Limpiar los campos del formulario del punto eliminado
    const fieldsToClear = [
      "time",
      "sector",
      "section",
      "illumination_type",
      "source_type",
      "illumination",
      "luminance_uniformity",
      "average_value",
      "required_value",
    ];

    fieldsToClear.forEach((field) => {
      setValue(`sampling_point_${idToDelete}_${field}`, "");
    });

    setPuntosMuestreo((prev) => {
      const filtered = prev.filter((punto) => punto.id !== idToDelete);
      // Reordenar los displayIndex para que sean consecutivos
      const updated = filtered.map((punto, index) => ({
        ...punto,
        displayIndex: index + 1,
      }));

      // Ejecutar autosave después de que el estado se actualice
      setTimeout(() => {
        autoSave();
      }, 0);

      return updated;
    });
  };

  const downloadPDF = async () => {
    dispatch({type:"expandAll"})

    // Pequeño delay para asegurar que las secciones se desplieguen antes de imprimir
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <>
      <Header title={"Audita"} />
      <div className="max-w-4xl mx-auto px-4 py-4">
        <HeroSection />

        {/* cards */}
        <div className="flex gap-6 py-4 print:hidden">
          <div className="flex-1">
            <Card
              icon={
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-white text-xl"
                />
              }
              text={"Cumplimiento normativo garantizado"}
            />
          </div>

          <div className="flex-1">
            <Card
              icon={
                <FontAwesomeIcon icon={faFile} className="text-white text-xl" />
              }
              text={"Registro digital, seguro y descargable"}
            />
          </div>
          <div className="flex-1">
            <Card
              icon={
                <FontAwesomeIcon
                  icon={faSignature}
                  className="text-white text-xl"
                />
              }
              text={"Ahorro de tiempo en tu práctica profesional"}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="text-lg text-gray-600">
                Cargando datos existentes...
              </span>
            </div>
          </div>
        ) : (
          <div className="py-4">
            <Form onSubmit={handleSubmit(sendData)}>
              <CompanySection 
                registerWithAutoSave={registerWithAutoSave} 
                isCollapsed={sections.empresa} 
                onToggle={() => dispatch({type:"toggle", key:"empresa"})} />

              <div className="break-before-page"></div>

              <ResponsibleSection 
                registerWithAutoSave={registerWithAutoSave}
                isCollapsed={sections.responsable} 
                onToggle={() => dispatch({type:"toggle", key:"responsable"})}
              />

              <MeasurementSection 
                registerWithAutoSave={registerWithAutoSave}
                isCollapsed={sections.medicion} 
                onToggle={() => dispatch({type:"toggle", key:"medicion"})}
              />

              <div className="break-before-page"></div>

              <SamplingPointsSection
                  registerWithAutoSave={registerWithAutoSave}
                  isCollapsed={sections.puntosMuestreo} 
                  onToggle={() => dispatch({type:"toggle", key:"puntosMuestreo"})}
              />

              <div className="break-inside-avoid">
                <ConclusionsSection
                  registerWithAutoSave={registerWithAutoSave}
                  isCollapsed={sections.conclusiones} 
                  onToggle={() => dispatch({type:"toggle", key:"conclusiones"})}
                />
              </div>

              {/* Indicador de autoguardado */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-500">
                  {isAutoSaving && (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                      Guardando automáticamente...
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-3 print:hidden">
                  <Button type="submit" variant="primary" onClick={downloadPDF}>
                    Descargar PDF
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default IluminationForm;
