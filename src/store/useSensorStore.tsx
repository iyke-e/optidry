import { create } from "zustand";

export interface SensorData {
  temperature: string | null;
  humidity: string | null;
  vibration: string | null;
  timestamp: number | null;
}

export interface SensorRecord {
  time: string;
  temperature: number;
  humidity: number;
}

type DryingStatus = "running" | "paused" | "stopped";

interface SensorStore {
  data: SensorData;
  records: SensorRecord[];
  status: DryingStatus;
  setData: (newData: Partial<SensorData>) => void;
  addRecord: (record: SensorRecord) => void;
  clearRecords: () => void;
  setStatus: (status: DryingStatus) => void;
  reset: () => void;
}

export const useSensorStore = create<SensorStore>((set) => ({
  data: {
    temperature: null,
    humidity: null,
    vibration: null,
    timestamp: null,
  },
  records: [],
  status: "running",

  setData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),

  addRecord: (record) =>
    set((state) => ({
      records: [...state.records, record],
    })),

  clearRecords: () => set({ records: [] }),

  setStatus: (status) => set({ status }),

  reset: () =>
    set({
      data: {
        temperature: null,
        humidity: null,
        vibration: null,
        timestamp: null,
      },
      records: [],
      status: "stopped",
    }),
}));
