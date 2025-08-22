import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WeatherHistory } from "../types/weather";

interface PrefState {
  units: "metric" | "imperial";
  defaultCity: string;
  theme: "light" | "dark";
  weatherHistory: WeatherHistory[];
  favorites: string[];
  setUnits: (u: "metric" | "imperial") => void;
  setDefaultCity: (c: string) => void;
  setTheme: (t: "light" | "dark") => void;
  addToHistory: (record: WeatherHistory) => void;
  clearHistory: () => void;
  addToFavorites: (city: string) => void;
  removeFromFavorites: (city: string) => void;
  getTemperatureUnit: () => string;
  getWindSpeedUnit: () => string;
}

const usePrefStore = create<PrefState>()(
  persist(
    (set, get) => ({
      units: "metric",
      defaultCity: "Delhi",
      theme: "light",
      weatherHistory: [],
      favorites: ["Delhi", "London"],

      setUnits: (u) => set({ units: u }),
      setDefaultCity: (c) => set({ defaultCity: c }),
      setTheme: (t) => set({ theme: t }),

      addToHistory: (record) => set((state) => ({
        weatherHistory: [record, ...state.weatherHistory.slice(0, 9)] // LAst 10 records
      })),

      clearHistory: () => set({ weatherHistory: [] }),

      addToFavorites: (city) => set((state) => ({
        favorites: state.favorites.includes(city) 
          ? state.favorites 
          : [...state.favorites, city]
      })),

      removeFromFavorites: (city) => set((state) => ({
        favorites: state.favorites.filter(f => f !== city)
      })),

      getTemperatureUnit: () => {
        const { units } = get();
        return units === "metric" ? "°C" : "°F";
      },

      getWindSpeedUnit: () => {
        const { units } = get();
        return units === "metric" ? "m/s" : "mph";
      },
    }),
    {
      name: "preferences-storage",
    }
  )
);

export default usePrefStore;