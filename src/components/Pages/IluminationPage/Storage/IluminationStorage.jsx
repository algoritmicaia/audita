import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useIluminationStore = create()(
  persist(
    (set, get) => ({
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

      samplingPoints: {
        samplingPoints: [],
        observations: "",
      },
      addSamplingPoint: () => {
        const currentPoints = get().samplingPoints.samplingPoints;
        const newPoint = {
          id: Date.now(), // ID único basado en timestamp
          displayIndex: currentPoints.length + 1,
          sector: "",
          section: "",
          time: "",
          illuminationType: "",
          sourceType: "",
          illumination: "",
          luminanceUniformity: "",
          averageValue: "",
          requiredValue: "",
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
    }),
    {
      name: "ilumination-storage", // nombre de la clave en localStorage
      storage: createJSONStorage(() => localStorage), // usar localStorage
    }
  )
);
