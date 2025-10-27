"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface DryerRunData {
  dryer: string;
  crop: string;
  initial_moisture_content: string;
  final_moisture_content: string;
  timestamp: string;
}

interface DryerStore {
  runData: DryerRunData;
  updateRunData: (key: keyof DryerRunData, value: string) => void;
  resetRunData: () => void;
}

export const useDryerStore = create<DryerStore>()(
  persist(
    (set) => ({
      runData: {
        dryer: "",
        crop: "",
        initial_moisture_content: "",
        final_moisture_content: "",
        timestamp: new Date().toISOString(),
      },
      updateRunData: (key, value) =>
        set((state) => ({
          runData: { ...state.runData, [key]: value },
        })),
      resetRunData: () =>
        set({
          runData: {
            dryer: "",
            crop: "",
            initial_moisture_content: "",
            final_moisture_content: "",
            timestamp: new Date().toISOString(),
          },
        }),
    }),
    {
      name: "dryer-run-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
