import React from 'react'
import Header from "../Ui/Header"
import Footer from "../Ui/Footer"
import Form from "../Ui/Form"
import InputForm from "../Ui/InputForm"
import Button from "../Ui/Button"
import Section from "../Ui/Section"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import PuntoMuestreo from "../Ui/PuntoMuestreo"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { processFormData } from '../../utils'
import { HeroSection } from '../Ui/HeroSection'

function App() {

  const {register, handleSubmit, getValues, setValue} = useForm();
  const [puntosMuestreo, setPuntosMuestreo] = useState([]);
  const [animatingItems, setAnimatingItems] = useState(new Set()); // Para controlar animaciones
  const [nextId, setNextId] = useState(0); // Para generar IDs únicos
  const [isAutoSaving, setIsAutoSaving] = useState(false); // Estado para mostrar feedback de autoguardado
  const [isLoading, setIsLoading] = useState(true); // Estado para mostrar loading mientras se cargan los datos
  
  useEffect(() => {
    const loadExistingData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/ilumination_protocol', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Obteniendo datos del servidor')
          console.log(data)
          // Si hay datos existentes, poblar los campos del formulario
          if (data && data.result !== 'ok') {
            // Datos de la empresa
            if (data.company_name) setValue('company_name', data.company_name);
            if (data.tax_id) setValue('tax_id', data.tax_id);
            if (data.address) setValue('address', data.address);
            if (data.city) setValue('city', data.city);
            if (data.state) setValue('state', data.state);
            if (data.postal_code) setValue('postal_code', data.postal_code);
            if (data.working_hours) setValue('working_hours', data.working_hours);

            // Datos del responsable
            if (data.first_name) setValue('first_name', data.first_name);
            if (data.last_name) setValue('last_name', data.last_name);
            if (data.license_number) setValue('license_number', data.license_number);

            // Datos de la medición
            if (data.instrument_model_serial) setValue('instrument_model_serial', data.instrument_model_serial);
            if (data.calibration_date) setValue('calibration_date', data.calibration_date);
            if (data.methodology) setValue('methodology', data.methodology);
            if (data.measurement_date) setValue('measurement_date', data.measurement_date);
            if (data.measurement_start_time) setValue('measurement_start_time', data.measurement_start_time);
            if (data.measurement_end_time) setValue('measurement_end_time', data.measurement_end_time);
            if (data.atmospheric_conditions) setValue('atmospheric_conditions', data.atmospheric_conditions);

            // Observaciones de puntos de muestreo
            if (data.sampling_observations) setValue('sampling_observations', data.sampling_observations);

            // Conclusiones y recomendaciones
            if (data.conclusions) setValue('conclusions', data.conclusions);
            if (data.recommendations) setValue('recommendations', data.recommendations);

            // Cargar puntos de muestreo si existen
            if (data.sampling_points && data.sampling_points.length > 0) {
              const puntos = data.sampling_points.map((punto, index) => ({
                id: index,
                displayIndex: index + 1
              }));
              setPuntosMuestreo(puntos);
              setNextId(puntos.length);

              // Poblar los campos de cada punto de muestreo
              data.sampling_points.forEach((punto, index) => {
                if (punto.time) setValue(`sampling_point_${index}_time`, punto.time);
                if (punto.sector) setValue(`sampling_point_${index}_sector`, punto.sector);
                if (punto.section) setValue(`sampling_point_${index}_section`, punto.section);
                if (punto.illumination_type) setValue(`sampling_point_${index}_illumination_type`, punto.illumination_type);
                if (punto.source_type) setValue(`sampling_point_${index}_source_type`, punto.source_type);
                if (punto.illumination) setValue(`sampling_point_${index}_illumination`, punto.illumination);
                if (punto.luminance_uniformity) setValue(`sampling_point_${index}_luminance_uniformity`, punto.luminance_uniformity);
                if (punto.average_value) setValue(`sampling_point_${index}_average_value`, punto.average_value);
                if (punto.required_value) setValue(`sampling_point_${index}_required_value`, punto.required_value);
              });
            }
          }
        }
      } catch (error) {
        console.error('Error cargando datos existentes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingData();
  }, [setValue]);

  const sendData = (data) => {
    console.log(data)
    
    // Procesar los datos para estructurar los puntos de muestreo
    const processedData = processFormData(data, puntosMuestreo);
    
    fetch('/api/ilumination_protocol', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processedData)
    })
  }

  // Función de autoguardado
  const autoSave = async () => {
    if (isAutoSaving) return; // Evitar múltiples llamadas simultáneas
    
    setIsAutoSaving(true);
    
    try {
      const formData = getValues(); // Obtiene todos los valores del formulario
      
      // Procesar los datos para estructurar los puntos de muestreo
      const processedData = processFormData(formData, puntosMuestreo);
      
      console.log('Autoguardando...');
      
      // Enviar los datos al servidor (puedes usar el mismo endpoint o crear uno específico para autoguardado)
      const response = await fetch('/api/ilumination_protocol', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData)
      });
      
      if (response.ok) {
        console.log('Autoguardado exitoso');
      } else {
        console.error('Error en autoguardado:', response.statusText);
      }
    } catch (error) {
      console.error('Error en autoguardado:', error);
    } finally {
      setIsAutoSaving(false);
    }
  }

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
      }
    };
  }

  const agregarPuntoMuestreo = () => {
    const newId = nextId;
    const newDisplayIndex = puntosMuestreo.length + 1;
    const newPunto = { id: newId, displayIndex: newDisplayIndex };
    
    setPuntosMuestreo(prev => [...prev, newPunto]);
    setNextId(prev => prev + 1);
    
    // Agregar el nuevo item a la lista de animaciones
    setAnimatingItems(prev => new Set([...prev, newId]));
       
    // Remover la animación después de 500ms
    setTimeout(() => {
      setAnimatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(newId);
        return newSet;
      });
    }, 500);
  }

  const eliminarPuntoMuestreo = async (idToDelete) => {
    // Limpiar los campos del formulario del punto eliminado
    const fieldsToClear = [
      'time', 'sector', 'section', 'illumination_type', 'source_type',
      'illumination', 'luminance_uniformity', 'average_value', 'required_value'
    ];
    
    fieldsToClear.forEach(field => {
      setValue(`sampling_point_${idToDelete}_${field}`, '');
    });

    setPuntosMuestreo(prev => {
      const filtered = prev.filter(punto => punto.id !== idToDelete);
      // Reordenar los displayIndex para que sean consecutivos
      const updated = filtered.map((punto, index) => ({
        ...punto,
        displayIndex: index + 1
      }));
      
      // Ejecutar autosave después de que el estado se actualice
      setTimeout(() => {
        autoSave();
      }, 0);
      
      return updated;
    });
  }

  const downloadPDF = async() => {
    expandAllSections();
    
    // Pequeño delay para asegurar que las secciones se desplieguen antes de imprimir
    setTimeout(() => {
      window.print()
    }, 100)
  }

  const [sectionsCollapse, setSectionsCollapse] = useState({
    empresa: false,
    responsable: true,
    medicion: true,
    puntosMuestreo: true,
    conclusiones: true
  });

  const toggleSection = (sectionName) => {
    setSectionsCollapse(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const expandAllSections = () => {
    setSectionsCollapse({
      empresa: false,
      responsable: false,
      medicion: false,
      puntosMuestreo: false,
      conclusiones: false
    });
  };

  return (
    <>
      <Header title={'Audita'}/>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <HeroSection/>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="text-lg text-gray-600">Cargando datos existentes...</span>
            </div>
          </div>
        ) : (
          <Form onSubmit={handleSubmit(sendData)}>
          <Section 
            title={'Datos de la empresa'} 
            isCollapsed={sectionsCollapse.empresa}
            onToggle={() => toggleSection('empresa')}
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

          <div className='break-before-page'>
          </div>

          <Section 
            title={'Datos del responsable'} 
            isCollapsed={sectionsCollapse.responsable}
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

          <Section 
            title={'Datos de la medición'} 
            isCollapsed={sectionsCollapse.medicion}
            onToggle={() => toggleSection('medicion')}
          >
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <InputForm
                    id="instrument_model_serial"
                    type="text"
                    labelText="Instrumento"
                    placeholder="Marca, modelo, nro de serie"
                    required={true}
                    register={registerWithAutoSave}
                  />
                </div>

                <div className="flex-1">
                  <InputForm
                    id="calibration_date"
                    type="date"
                    labelText="Fecha de calibración"
                    placeholder="Ingresa la fecha de calibracion de tu equipo"
                    required={true}
                    register={registerWithAutoSave}
                  />
              </div>
              </div>

              <InputForm
                id="methodology"
                useArea={true}
                labelText="Metodología utilizada"
                placeholder="Ingresa la metodología utilizada"
                required={true}
                register={registerWithAutoSave}
              />

              <InputForm
                id="measurement_date"
                type="date"
                labelText="Fecha de la medición"
                required={true}
                register={registerWithAutoSave}
              />

              <div className="space-y-4 flex gap-4">
                <div className="flex-1">
                  <InputForm
                    id="measurement_start_time"
                    type="time"
                    labelText="Hora de inicio de la medición"
                    required={true}
                    register={registerWithAutoSave}
                  />
               </div>

               <div className="flex-1">
                  <InputForm
                    id="measurement_end_time"
                    type="time"
                    labelText="Hora de finalización"
                    required={true}
                    register={registerWithAutoSave}
                  />
                </div>

              </div>

              <InputForm
                id="atmospheric_conditions"
                useArea={true}
                labelText="Condiciones atmosféricas"
                required={true}
                register={registerWithAutoSave}
              />

            </div>
          </Section>

          <div className='break-before-page'>
          </div>
          
          <Section 
            title={'Puntos de muestreo'} 
            isCollapsed={sectionsCollapse.puntosMuestreo}
            onToggle={() => toggleSection('puntosMuestreo')}
          >
            {/* Contenedor scrolleable para los puntos de muestreo */}
            <div className="puntos-muestreo-container space-y-4 pr-2 mb-4">
              {puntosMuestreo.map((punto) => (
                <div
                  key={punto.id}
                  className={`transition-all duration-125 ease-out ${
                    animatingItems.has(punto.id)
                      ? 'opacity-0 transform -translate-y-4 scale-95'
                      : 'opacity-100 transform translate-y-0 scale-100'
                  }`}
                >
                  <PuntoMuestreo 
                     register={registerWithAutoSave} 
                     id={punto.id}
                     displayIndex={punto.displayIndex}
                     onDelete={eliminarPuntoMuestreo}
                   />
                </div>
              ))}

              <InputForm
                  id="sampling_observations"
                  useArea={true}
                  labelText="Observaciones"
                  required={true}
                  register={registerWithAutoSave}
                />
            </div>

            
            {/* Botón para agregar más puntos de muestreo */}
            <div className="mt-6">
              <Button 
                type="button" 
                variant="success" 
                onClick={agregarPuntoMuestreo}
                className="flex items-center gap-2 print:hidden"
              >
                <FontAwesomeIcon icon={faPlus} />
                Añadir punto de muestreo
              </Button>
            </div>
          </Section>

          <Section 
            title={'Conclusiones y recomendaciones'} 
            isCollapsed={sectionsCollapse.conclusiones}
            onToggle={() => toggleSection('conclusiones')}
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

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            {/* Indicador de autoguardado */}
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
        )}
      </div>

      <Footer />

    </>
  )
}

export default App;
