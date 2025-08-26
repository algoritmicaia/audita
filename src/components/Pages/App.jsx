import React from 'react'
import Header from "../Ui/Header"
import Footer from "../Ui/Footer"
import Form from "../Ui/Form"
import InputForm from "../Ui/InputForm"
import Button from "../Ui/Button"
import Section from "../Ui/Section"
import { useForm } from "react-hook-form"
import PuntoMuestreo from "../Ui/PuntoMuestreo"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {

  const {register, handleSubmit, getValues} = useForm();
  const [puntosMuestreo, setPuntosMuestreo] = React.useState([]); // Inicialmente 1 punto
  const [animatingItems, setAnimatingItems] = React.useState(new Set()); // Para controlar animaciones
  const [nextId, setNextId] = React.useState(0); // Para generar IDs únicos
  const [isAutoSaving, setIsAutoSaving] = React.useState(false); // Estado para mostrar feedback de autoguardado
  
  const sendData = (data) => {
    console.log(data)
    
    // Procesar los datos para estructurar los puntos de muestreo
    const processedData = processFormData(data);
    
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
      const processedData = processFormData(formData);
      
      console.log('Autoguardando:', processedData);
      
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

  // Función para procesar los datos del formulario y estructurar los puntos de muestreo
  const processFormData = (formData) => {
    const processedData = { ...formData };
    
    // Validar y transformar tipos de datos
    if (processedData.license_number) {
      const licenseNum = parseInt(processedData.license_number);
      processedData.license_number = isNaN(licenseNum) ? null : licenseNum;
    } else {
      processedData.license_number = null;
    }
    
    // Limpiar fechas vacías
    if (!processedData.calibration_date || processedData.calibration_date === '') {
      processedData.calibration_date = null;
    }
    if (!processedData.measurement_date || processedData.measurement_date === '') {
      processedData.measurement_date = null;
    }
    
    // Limpiar tiempos vacíos
    if (!processedData.measurement_start_time || processedData.measurement_start_time === '') {
      processedData.measurement_start_time = null;
    }
    if (!processedData.measurement_end_time || processedData.measurement_end_time === '') {
      processedData.measurement_end_time = null;
    }
    
    // Limpiar campos de texto vacíos
    const textFields = [
      'company_name', 'tax_id', 'address', 'city', 'state', 'postal_code', 'working_hours',
      'first_name', 'last_name', 'instrument_model_serial', 'methodology', 'atmospheric_conditions',
      'sampling_observations', 'conclusions', 'recommendations'
    ];
    
    textFields.forEach(field => {
      if (!processedData[field] || processedData[field] === '') {
        processedData[field] = null;
      }
    });
    
    // Extraer y estructurar los puntos de muestreo
    const samplingPoints = [];
    
    puntosMuestreo.forEach((punto) => {
      const samplingPoint = {
        time: formData[`sampling_point_${punto.id}_time`] || null,
        sector: formData[`sampling_point_${punto.id}_sector`] || null,
        section: formData[`sampling_point_${punto.id}_section`] || null,
        illumination_type: formData[`sampling_point_${punto.id}_illumination_type`] || null,
        source_type: formData[`sampling_point_${punto.id}_source_type`] || null,
        illumination: formData[`sampling_point_${punto.id}_illumination`] || null,
        luminance_uniformity: formData[`sampling_point_${punto.id}_luminance_uniformity`] || null,
        average_value: formData[`sampling_point_${punto.id}_average_value`] || null,
        required_value: formData[`sampling_point_${punto.id}_required_value`] || null
      };
      
      // Solo agregar el punto si tiene al menos un campo con datos
      if (Object.values(samplingPoint).some(value => value !== null && value !== '')) {
        samplingPoints.push(samplingPoint);
      }
    });
    
    // Asignar la lista de puntos de muestreo procesados
    processedData.sampling_points = samplingPoints;
    
    // Eliminar los campos individuales de puntos de muestreo del objeto principal
    puntosMuestreo.forEach((punto) => {
      delete processedData[`sampling_point_${punto.id}_time`];
      delete processedData[`sampling_point_${punto.id}_sector`];
      delete processedData[`sampling_point_${punto.id}_section`];
      delete processedData[`sampling_point_${punto.id}_illumination_type`];
      delete processedData[`sampling_point_${punto.id}_source_type`];
      delete processedData[`sampling_point_${punto.id}_illumination`];
      delete processedData[`sampling_point_${punto.id}_luminance_uniformity`];
      delete processedData[`sampling_point_${punto.id}_average_value`];
      delete processedData[`sampling_point_${punto.id}_required_value`];
    });
    
    return processedData;
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
    
    // Auto-scroll al final después de que se renderice el nuevo elemento
    setTimeout(() => {
      const container = document.querySelector('.puntos-muestreo-container');
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 50);
    
    // Remover la animación después de 500ms
    setTimeout(() => {
      setAnimatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(newId);
        return newSet;
      });
    }, 500);
  }

  const eliminarPuntoMuestreo = (idToDelete) => {
    setPuntosMuestreo(prev => {
      const filtered = prev.filter(punto => punto.id !== idToDelete);
      // Reordenar los displayIndex para que sean consecutivos
      return filtered.map((punto, index) => ({
        ...punto,
        displayIndex: index + 1
      }));
    });
  }

  return (
    <>
      <Header title={'Audita'}/>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Form onSubmit={handleSubmit(sendData)}>
          <Section title={'Datos de la empresa'} collapse={false}>

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

          <Section title={'Datos del responsable'}>
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

          <Section title={'Datos de la medición'}>
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

          <Section title={'Puntos de muestreo'}>
            {/* Contenedor scrolleable para los puntos de muestreo */}
            <div className="puntos-muestreo-container max-h-[500px] overflow-y-auto space-y-4 pr-2 mb-4">
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
                className="flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPlus} />
                Añadir punto de muestreo
              </Button>
            </div>
          </Section>

          <Section title={'Conclusiones y recomendaciones'}>
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
            
            <div className="flex items-center space-x-3">
              <Button type="submit" variant="primary">
                Enviar
              </Button>
            </div>
          </div>

        </Form>
      </div>

      <Footer />

    </>
  )
}

export default App
