import type { CurrentWeather, ForecastItem, WeatherHistory } from "../types/weather";
import { weatherApi } from "./axiosSetup";
import usePrefStore from "../store/prefStore";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

if (!WEATHER_API_KEY) {
  throw new Error("VITE_WEATHER_API_KEY is not set in environment variables");
}

export async function fetchCurrentWeather(city: string, units: string): Promise<CurrentWeather> {
  try {
    const res = await weatherApi.get(`/weather`, { 
      params: { q: city, units, appid: WEATHER_API_KEY } 
    });
    
    // Add to history
    const historyRecord: WeatherHistory = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      city: res.data.name,
      temp: res.data.main.temp,
      description: res.data.weather[0]?.description || "Unknown",
      humidity: res.data.main.humidity,
      windSpeed: res.data.wind.speed,
    };
    
    usePrefStore.getState().addToHistory(historyRecord);
    
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch weather for ${city}: ${error.message}`);
    }
    throw new Error(`Failed to fetch weather for ${city}`);
  }
}

export async function fetchForecast(city: string, units: string): Promise<{ list: ForecastItem[] }> {
  try {
    const res = await weatherApi.get(`/forecast`, { 
      params: { q: city, units, appid: WEATHER_API_KEY, cnt: 40 } 
    });
    console.log("res wala data", res.data)
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch forecast for ${city}: ${error.message}`);
    }
    throw new Error(`Failed to fetch forecast for ${city}`);
  }
}

export async function searchCities(query: string): Promise<Array<{ name: string; country: string; lat: number; lon: number }>> {
  try {
    const res = await weatherApi.get(`/find`, { 
      params: { q: query, appid: WEATHER_API_KEY, type: "like", cnt: 10 } 
    });
    
    interface SearchResultItem {
      name: string;
      sys: { country: string };
      coord: { lat: number; lon: number };
    }
    
    return res.data.list.map((item: SearchResultItem) => ({
      name: item.name,
      country: item.sys.country,
      lat: item.coord.lat,
      lon: item.coord.lon,
    }));
  } catch (error) {
    console.error("Failed to search cities:", error);
    return [];
  }
}