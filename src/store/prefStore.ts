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

  getClasses: () => {
    cardClass: string;
    labelClass: string;
    inputClass: string;
    subTextClass: string;
    cardClassName: string;
  };
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
      getClasses: () => {
        const { theme } = get();
        return {
          cardClass:
            theme === "dark"
              ? "bg-gray-800 text-gray-100 border border-gray-700"
              : "bg-white text-gray-900 border border-gray-200",
 
          labelClass: theme === "dark" ? "text-gray-200" : "text-gray-700",
 
          inputClass:
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500",
 
          subTextClass: theme === "dark" ? "text-gray-400" : "text-gray-500",
          cardClassName: theme === "dark" ? "bg-gray-700 text-gray-100 border border-gray-600 p-3 rounded transform hover:scale-110 transition-transform duration-200" 
          : "bg-purple-100 text-gray-900 p-3 rounded transform hover:scale-110 transition-transform duration-200",
        };
      },
    }),
    {
      name: "preferences-storage",
    }
  )
);

export default usePrefStore;