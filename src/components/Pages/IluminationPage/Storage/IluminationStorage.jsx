import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useIluminationStore = create()(
  persist(
    (set, get) => {
      // Función para obtener fecha actual en formato YYYY-MM-DD
      const getCurrentDate = () => {
        const now = new Date();
        return now.toISOString().split('T')[0];
      };

      // Función para obtener hora actual en formato HH:MM
      const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().slice(0, 5);
      };

      return {
        company: {
          companyName: "",
          taxId: "",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          workingHours: "",
        },
        setCompanyField: (field, value) =>
          set((state) => ({
            company: {
              ...state.company,
              [field]: value,
            },
          })),

        measurement: {
          instrumentModelSerial: "",
          calibrationDate: getCurrentDate(),
          methodology: "",
          measurementDate: getCurrentDate(), // Fecha actual por defecto
          measurementStartTime: getCurrentTime(), // Hora actual por defecto
          measurementEndTime: getCurrentTime(),
          atmosphericConditions: "",
        },
        setMeasurementField: (field, value) =>
          set((state) => ({
            measurement: {
              ...state.measurement,
              [field]: value,
            },
          })),

        conclusions: {
          conclusions: "",
          recommendations: "",
        },
        setConclusionsField: (field, value) =>
          set((state) => ({
            conclusions: {
              ...state.conclusions,
              [field]: value,
            },
          })),

        samplingPoints: {
          samplingPoints: [],
          observations: "",
        },
        addSamplingPoint: () => {
          const currentPoints = get().samplingPoints.samplingPoints;
          const now = new Date();
          const currentTime = now.toTimeString().slice(0, 5); // Formato HH:MM
          
          // Si no es el primer punto, tomar valores del punto anterior
          const previousPoint = currentPoints.length > 0 ? currentPoints[currentPoints.length - 1] : null;
          
          const newPoint = {
            id: Date.now(), // ID único basado en timestamp
            displayIndex: currentPoints.length + 1,
            sector: previousPoint ? previousPoint.sector : "",
            section: "", // Siempre vacío para permitir personalización
            time: currentTime, // Hora actual por defecto
            illuminationType: previousPoint ? previousPoint.illuminationType : "",
            sourceType: previousPoint ? previousPoint.sourceType : "",
            illumination: previousPoint ? previousPoint.illumination : "",
            luminanceUniformity: previousPoint ? previousPoint.luminanceUniformity : "",
            measuredValue: "", // Siempre vacío para permitir medición específica
            requiredValue: previousPoint ? previousPoint.requiredValue : "",
          };
          set((state) => ({
            samplingPoints: {
              ...state.samplingPoints,
              samplingPoints: [...state.samplingPoints.samplingPoints, newPoint],
            },
          }));
        },
        removeSamplingPoint: (pointId) => {
          set((state) => ({
            samplingPoints: {
              ...state.samplingPoints,
              samplingPoints: state.samplingPoints.samplingPoints
                .filter((point) => point.id !== pointId)
                .map((point, index) => ({
                  ...point,
                  displayIndex: index + 1,
                })),
            },
          }));
        },
        setSamplingPointField: (pointId, field, value) =>
          set((state) => ({
            samplingPoints: {
              ...state.samplingPoints,
              samplingPoints: state.samplingPoints.samplingPoints.map((point) =>
                point.id === pointId
                  ? { ...point, [field]: value }
                  : point
              ),
            },
          })),
        setSamplingObservations: (value) =>
          set((state) => ({
            samplingPoints: {
              ...state.samplingPoints,
              observations: value,
            },
          })),
        resetAllData: () => {
          set({
            company: {
              companyName: "",
              taxId: "",
              address: "",
              city: "",
              state: "",
              postalCode: "",
              workingHours: "",
            },
            measurement: {
              instrumentModelSerial: "",
              calibrationDate: getCurrentDate(),
              methodology: "",
              measurementDate: getCurrentDate(),
              measurementStartTime: getCurrentTime(),
              measurementEndTime: getCurrentTime(),
              atmosphericConditions: "",
            },
            conclusions: {
              conclusions: "",
              recommendations: "",
            },
            samplingPoints: {
              samplingPoints: [],
              observations: "",
            },
          });
        },
      };
    },
    {
      name: "ilumination-storage", // nombre de la clave en localStorage
      storage: createJSONStorage(() => localStorage), // usar localStorage
    }
  )
);
