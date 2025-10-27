import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SensorData {
  temperature: string | null;
  humidity: string | null;
  vibration: string | null;
  timestamp: number | null;
}

type DryingStatus = "running" | "paused" | "stopped";

interface SensorStore {
  data: SensorData;
  status: DryingStatus;
  setData: (newData: Partial<SensorData>) => void;
  setStatus: (status: DryingStatus) => void;
  reset: () => void;
}

export const useSensorStore = create<SensorStore>()(
  persist(
    (set) => ({
      data: {
        temperature: null,
        humidity: null,
        vibration: null,
        timestamp: null,
      },
      status: "running",
      setData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
        })),
      setStatus: (status) => set({ status }),
      reset: () =>
        set({
          data: {
            temperature: null,
            humidity: null,
            vibration: null,
            timestamp: null,
          },
          status: "stopped",
        }),
    }),
    {
      name: "sensor-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
