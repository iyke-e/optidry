"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface DryerRunData {
  dryer: string;
  crop: string;
  initial_moisture_content: string | number | null;
  final_moisture_content: string | number | null;
  timestamp: string;
  last_temperature?: string | null;
  last_humidity?: string | null;
  last_vibration?: string | null;
  dryingProgress?: number | null;
}

interface DryerStore {
  runData: DryerRunData;
  updateRunData: (
    key: keyof DryerRunData,
    value: string | number | null | undefined
  ) => void;
  resetRunData: () => void;
  setRunData: (data: Partial<DryerRunData>) => void;
}

export const useDryerStore = create<DryerStore>()(
  persist(
    (set) => ({
      runData: {
        dryer: "",
        crop: "",
        initial_moisture_content: null,
        final_moisture_content: null,
        timestamp: new Date().toISOString(),
        last_temperature: null,
        last_humidity: null,
        last_vibration: null,
        dryingProgress: null,
      },
      updateRunData: (key, value) =>
        set((state) => ({
          runData: {
            ...state.runData,
            [key]: value ?? null,
          },
        })),
      setRunData: (data) =>
        set((state) => ({
          runData: {
            ...state.runData,
            ...Object.fromEntries(
              Object.entries(data).map(([k, v]) => [k, v ?? null])
            ),
          },
        })),
      resetRunData: () =>
        set({
          runData: {
            dryer: "",
            crop: "",
            initial_moisture_content: null,
            final_moisture_content: null,
            timestamp: new Date().toISOString(),
            last_temperature: null,
            last_humidity: null,
            last_vibration: null,
            dryingProgress: null,
          },
        }),
    }),
    {
      name: "dryer-run-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
