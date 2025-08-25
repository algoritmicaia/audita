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

  const {register, handleSubmit} = useForm();
  const [puntosMuestreo, setPuntosMuestreo] = React.useState([{id: 0, displayIndex: 1}]); // Inicialmente 1 punto
  const [animatingItems, setAnimatingItems] = React.useState(new Set()); // Para controlar animaciones
  const [nextId, setNextId] = React.useState(1); // Para generar IDs únicos
  
  const sendData = (data) => {
    console.log(data);
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
                  id="razon_social"
                  type="text"
                  labelText="Razón social"
                  placeholder="Ingresa la razón social de la empresa"
                  required={true}
                  register={register}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  id="cuit"
                  type="number"
                  labelText="CUIT"
                  placeholder="Ingresa el cuit de la empresa"
                  required={true}
                  register={register}
                />
              </div>
            </div>

            <div className="space-y-4 gap-4">
              <div className="">
                <InputForm
                  id="direccion"
                  type="text"
                  labelText="Dirección"
                  placeholder="Ingresa la dirección de la empresa"
                  required={true}
                  register={register}
                />
              </div>

              <div className="">
                <InputForm
                  id="localidad"
                  type="text"
                  labelText="Localidad"
                  placeholder="Ingresa la localidad de la empresa"
                  required={true}
                  register={register}
                />
              </div>

              <div className="">
                <InputForm
                  id="provincia"
                  type="text"
                  labelText="Provincia"
                  placeholder="Ingresa la provincia de la empresa"
                  required={true}
                  register={register}
                />
              </div>

              <div className="">
                <InputForm
                  id="codigo_postal"
                  type="text"
                  labelText="CP"
                  placeholder="Ingresa el código postal"
                  required={true}
                  register={register}
                />
              </div>

              <div className="">
                <InputForm
                  id="horarios"
                  useArea={true}
                  labelText="Horarios/Turnos habituales de la empresa"
                  placeholder="Ingresa los horarios de la empresa"
                  required={true}
                  register={register}
                />
              </div>

            </div>

          </Section>

          <Section title={'Datos del responsable'}>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <InputForm
                    id="nombre"
                    type="text"
                    labelText="Nombre"
                    placeholder="Ingresa tu nombre"
                    required={true}
                    register={register}
                  />

                </div>
                <div className="flex-1">
                  <InputForm
                    id="apellido"
                    type="text"
                    labelText="Apellido"
                    placeholder="Ingresa tu apellido"
                    required={true}
                    register={register}
                  />

                </div>

              </div>

              <InputForm
                id="matricula"
                type="number"
                labelText="Matrícula"
                placeholder="Ingresa tu matricula profesional"
                required={true}
                register={register}
              />

            </div>
          </Section>

          <Section title={'Datos de la medición'}>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <InputForm
                    id="marca_modelo_nro_serie"
                    type="text"
                    labelText="Instrumento"
                    placeholder="Marca, modelo, nro de serie"
                    required={true}
                    register={register}
                  />
                </div>

                <div className="flex-1">
                  <InputForm
                    id="fecha_calibracion"
                    type="date"
                    labelText="Fecha de calibración"
                    placeholder="Ingresa la fecha de calibracion de tu equipo"
                    required={true}
                    register={register}
                  />
              </div>
              </div>

              <InputForm
                id="metodologia"
                useArea={true}
                labelText="Metodología utilizada"
                placeholder="Ingresa la metodología utilizada"
                required={true}
                register={register}
              />

              <InputForm
                id="fecha_medicion"
                type="date"
                labelText="Fecha de la medición"
                required={true}
                register={register}
              />

              <div className="space-y-4 flex gap-4">
                <div className="flex-1">
                  <InputForm
                    id="hora_inicio_medicion"
                    type="time"
                    labelText="Hora de inicio de la medición"
                    required={true}
                    register={register}
                  />
               </div>

               <div className="flex-1">
                  <InputForm
                    id="hora_fin_medicion"
                    type="time"
                    labelText="Hora de finalización"
                    required={true}
                    register={register}
                  />
                </div>

              </div>

              <InputForm
                id="condiciones_atmosfericas"
                useArea={true}
                labelText="Condiciones atmosféricas"
                required={true}
                register={register}
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
                     register={register} 
                     id={punto.id}
                     displayIndex={punto.displayIndex}
                     onDelete={eliminarPuntoMuestreo}
                     showDeleteButton={puntosMuestreo.length > 1}
                   />
                </div>
              ))}

              <InputForm
                  id="punto_muestreo_observaciones"
                  useArea={true}
                  labelText="Observaciones"
                  required={true}
                  register={register}
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
                    id="conclusioens"
                    useArea={true}
                    labelText="Conclusiones"
                    placeholder="Escribe tus conclusiones"
                    required={true}
                    register={register}
                  />

                  <InputForm
                    id="recomendaciones"
                    useArea={true}
                    labelText="Recomendaciones"
                    placeholder="Escribe tus recomendaciones"
                    required={true}
                    register={register}
                  />

            </div>
          </Section>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button type="submit" variant="primary">
              Enviar
            </Button>
          </div>

        </Form>
      </div>


      <Footer />

    </>
  )
}

export default App
