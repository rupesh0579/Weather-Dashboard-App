// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import usePrefStore from "../store/prefStore";
// import type { ForecastItem } from "../types/weather";
// import { fetchCurrentWeather, fetchForecast, searchCities } from "../api/weatherServices";

// // Debounce hook
// function useDebounce<T>(value: T, delay: number): T {
//   const [debouncedValue, setDebouncedValue] = useState(value);
//   useEffect(() => {
//     const id = setTimeout(() => setDebouncedValue(value), delay);
//     return () => clearTimeout(id);
//   }, [value, delay]);
//   return debouncedValue;
// }

// export default function WeatherView() {
//   const { defaultCity, units, favorites, getTemperatureUnit, getWindSpeedUnit } = usePrefStore();
//   const [selectedCity, setSelectedCity] = useState(defaultCity);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSearch, setShowSearch] = useState(false);

//   const debouncedSearch = useDebounce(searchQuery, 500);

//   const { data: current, isLoading: currentLoading, error: currentError } = useQuery({
//     queryKey: ["weather", selectedCity, units],
//     queryFn: () => fetchCurrentWeather(selectedCity, units),
//     retry: 2,
//     staleTime: 5 * 60 * 1000, //5mnt
//   });

//   const { data: forecast, isLoading: forecastLoading } = useQuery({
//     queryKey: ["forecast", selectedCity, units],
//     queryFn: () => fetchForecast(selectedCity, units),
//     retry: 2,
//     staleTime: 10 * 60 * 1000, //10mnt
//   });

//   // Debounced city search
//   const { data: searchResults, isFetching: searching } = useQuery({
//     queryKey: ["search", debouncedSearch],
//     queryFn: () => searchCities(debouncedSearch),
//     enabled: debouncedSearch.length > 2,
//     staleTime: 30 * 60 * 1000, 
//   });

//   const formatTime = (timestamp: number) => {
//     return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const formatDate = (timestamp: number) => {
//     return new Date(timestamp * 1000).toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const getWeatherIcon = (iconCode: string) => {
//     return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
//   };

//   const handleCitySelect = (city: string) => {
//     setSelectedCity(city);
//     setShowSearch(false);
//     setSearchQuery("");
//   };

//   if (currentError) {
//     return (
//       <div className="p-4">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <h3 className="font-bold">Error loading weather data</h3>
//           <p>{currentError instanceof Error ? currentError.message : "An error occurred"}</p>
//           <button
//             onClick={() => setSelectedCity(defaultCity)}
//             className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
//           >
//             Try Default City
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 ">
//       {/* City Selection */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <div className="flex flex-wrap gap-2 mb-4">
//           <h3 className="text-lg font-semibold mb-2 w-full">Select City</h3>
//           {favorites.map((city) => (
//             <button
//               key={city}
//               onClick={() => handleCitySelect(city)}
//               className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
//                 selectedCity === city
//                   ? "bg-purple-800 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               {city}
//             </button>
//           ))}
//           <button
//             onClick={() => setShowSearch(!showSearch)}
//             className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200"
//           >
//             + Search
//           </button>
//         </div>

//         {showSearch && (
//           <div className="relative">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search city..."
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
//             />
//             {searching && (
//               <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
//                 Searching…
//               </div>
//             )}
//             {searchResults && searchResults.length > 0 && (
//               <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
//                 {searchResults.map((result, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => handleCitySelect(result.name)}
//                     className="w-full text-left px-3 py-2 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
//                   >
//                     {result.name}, {result.country}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Current Weather */}
//       {currentLoading ? (
//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="animate-pulse space-y-4">
//             <div className="h-6 bg-gray-200 rounded w-1/3"></div>
//             <div className="h-8 bg-gray-200 rounded w-1/2"></div>
//             <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//           </div>
//         </div>
//       ) : current ? (
//         <div className="bg-white p-6 rounded-lg shadow ">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-2xl font-bold text-gray-800">{current.name}</h2>
//             <div className="text-right">
//               <div className="text-3xl font-bold text-blue-600">
//                 {Math.round(current.main.temp)}{getTemperatureUnit()}
//               </div>
//               <div className="text-sm text-gray-500">
//                 Feels like {Math.round(current.main.feels_like)}{getTemperatureUnit()}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center mb-4">
//             {current.weather[0] && (
//               <>
//                 <img
//                   src={getWeatherIcon(current.weather[0].icon)}
//                   alt={current.weather[0].description}
//                   className="w-16 h-16 mr-3"
//                 />
//                 <div>
//                   <div className="text-lg font-medium capitalize">
//                     {current.weather[0].description}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {Math.round(current.main.temp_min)}{getTemperatureUnit()} / {Math.round(current.main.temp_max)}{getTemperatureUnit()}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//             <div className="bg-purple-100 p-3 rounded transform hover:scale-110 transition-transform duration-200">
//               <div className="text-gray-500">Humidity</div>
//               <div className="font-semibold">{current.main.humidity}%</div>
//             </div>
//             <div className="bg-purple-100 p-3 rounded transform hover:scale-110 transition-transform duration-200">
//               <div className="text-gray-500">Wind</div>
//               <div className="font-semibold">{current.wind.speed} {getWindSpeedUnit()}</div>
//             </div>
//             <div className="bg-purple-100 p-3 rounded transform hover:scale-110 transition-transform duration-200">
//               <div className="text-gray-500">Pressure</div>
//               <div className="font-semibold">{current.main.pressure} hPa</div>
//             </div>
//             <div className="bg-purple-100 p-3 rounded transform hover:scale-110 transition-transform duration-200">
//               <div className="text-gray-500">Clouds</div>
//               <div className="font-semibold">{current.clouds.all}%</div>
//             </div>
//           </div>
//         </div>
//       ) : null}

//       {/* Forecast */}
//       {forecastLoading ? (
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="animate-pulse">
//                 <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                 <div className="h-12 bg-gray-200 rounded mb-2"></div>
//                 <div className="h-4 bg-gray-200 rounded"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : forecast ? (
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//             {forecast.list
//               .filter((_, index) => index % 8 === 0)
//               .slice(0, 5)
//               .map((f: ForecastItem, idx: number) => (
//                 <div key={idx} className="text-center p-3 bg-purple-100 rounded transform hover:scale-110 transition-transform duration-200">
//                   <div className="font-medium text-sm mb-2">
//                     {formatDate(f.dt)}
//                   </div>
//                   {f.weather[0] && (
//                     <img
//                       src={getWeatherIcon(f.weather[0].icon)}
//                       alt={f.weather[0].description}
//                       className="w-12 h-12 mx-auto mb-2"
//                     />
//                   )}
//                   <div className="font-semibold text-lg">
//                     {Math.round(f.main.temp)}{getTemperatureUnit()}
//                   </div>
//                   <div className="text-xs text-gray-500 capitalize">
//                     {f.weather[0]?.description}
//                   </div>
//                   <div className="text-xs text-gray-400 mt-1">
//                     {Math.round(f.main.temp_min)}{getTemperatureUnit()} / {Math.round(f.main.temp_max)}{getTemperatureUnit()}
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       ) : null}

//       {/* Hourly Forecast */}
//       {forecast && (
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-xl font-bold mb-4">24-Hour Forecast</h3>
//           <div className="overflow-x-auto">
//             <div className="flex space-x-4 min-w-max">
//               {forecast.list.slice(0, 8).map((f: ForecastItem, idx: number) => (
//                 <div key={idx} className="text-center flex-shrink-0 w-34">
//                   <div className="text-sm font-medium mb-2">
//                     {formatTime(f.dt)}
//                   </div>
//                   {f.weather[0] && (
//                     <img
//                       src={getWeatherIcon(f.weather[0].icon)}
//                       alt={f.weather[0].description}
//                       className="w-10 h-10 mx-auto mb-2"
//                     />
//                   )}
//                   <div className="font-semibold">
//                     {Math.round(f.main.temp)}{getTemperatureUnit()}
//                   </div>
//                   <div className="text-xs text-gray-500 mt-1">
//                     {Math.round(f.main.humidity)}%
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import usePrefStore from "../store/prefStore";
import type { ForecastItem } from "../types/weather";
import { fetchCurrentWeather, fetchForecast, searchCities } from "../api/weatherServices";

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debouncedValue;
}

export default function WeatherView() {
  const { defaultCity, units, favorites, getTemperatureUnit, getWindSpeedUnit, getClasses } = usePrefStore();
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const { cardClass, labelClass, inputClass, subTextClass, cardClassName } = getClasses();

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data: current, isLoading: currentLoading, error: currentError } = useQuery({
    queryKey: ["weather", selectedCity, units],
    queryFn: () => fetchCurrentWeather(selectedCity, units),
    retry: 2,
    staleTime: 5 * 60 * 1000, //5mnt
  });

  const { data: forecast, isLoading: forecastLoading } = useQuery({
    queryKey: ["forecast", selectedCity, units],
    queryFn: () => fetchForecast(selectedCity, units),
    retry: 2,
    staleTime: 10 * 60 * 1000, //10mnt
  });

  // Debounced city search
  const { data: searchResults, isFetching: searching } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => searchCities(debouncedSearch),
    enabled: debouncedSearch.length > 2,
    staleTime: 30 * 60 * 1000, 
  });

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowSearch(false);
    setSearchQuery("");
  };

  if (currentError) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h3 className="font-bold">Error loading weather data</h3>
          <p>{currentError instanceof Error ? currentError.message : "An error occurred"}</p>
          <button
            onClick={() => setSelectedCity(defaultCity)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Try Default City
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* City Selection */}
      <div className={`${cardClass} p-4 rounded-lg shadow`}>
        <div className="flex flex-wrap gap-2 mb-4">
          <h3 className={`text-lg font-semibold mb-2 w-full ${labelClass}`}>Select City</h3>
          {favorites.map((city) => (
            <button
              key={city}
              onClick={() => handleCitySelect(city)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCity === city
                  ? "bg-purple-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {city}
            </button>
          ))}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200"
          >
            + Search
          </button>
        </div>

        {showSearch && (
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city..."
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${inputClass}`}
            />
            {searching && (
              <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${subTextClass}`}>
                Searching…
              </div>
            )}
            {searchResults && searchResults.length > 0 && (
              <div className={`${cardClass} absolute top-full left-0 right-0 border rounded-md mt-1 shadow-lg z-10`}>
                {searchResults.map((result, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCitySelect(result.name)}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md ${labelClass}`}
                  >
                    {result.name}, {result.country}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Current Weather */}
      {currentLoading ? (
        <div className={`${cardClass} p-6 rounded-lg shadow`}>
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ) : current ? (
        <div className={`${cardClass} p-6 rounded-lg shadow`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-2xl font-bold ${labelClass}`}>{current.name}</h2>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(current.main.temp)}{getTemperatureUnit()}
              </div>
              <div className={`text-sm ${subTextClass}`}>
                Feels like {Math.round(current.main.feels_like)}{getTemperatureUnit()}
              </div>
            </div>
          </div>

          <div className="flex items-center mb-4">
            {current.weather[0] && (
              <>
                <img
                  src={getWeatherIcon(current.weather[0].icon)}
                  alt={current.weather[0].description}
                  className="w-16 h-16 mr-3"
                />
                <div>
                  <div className="text-lg font-medium capitalize">
                    {current.weather[0].description}
                  </div>
                  <div className={`text-sm ${subTextClass}`}>
                    {Math.round(current.main.temp_min)}{getTemperatureUnit()} 
                    {/* / {Math.round(current.main.temp_max)}{getTemperatureUnit()} */}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className={cardClassName}>
              <div className={subTextClass}>Humidity</div>
              <div className="font-semibold">{current.main.humidity}%</div>
            </div>
            <div className={cardClassName}>
              <div className={subTextClass}>Wind</div>
              <div className="font-semibold">{current.wind.speed} {getWindSpeedUnit()}</div>
            </div>
            <div className={cardClassName}>
              <div className={subTextClass}>Pressure</div>
              <div className="font-semibold">{current.main.pressure} hPa</div>
            </div>
            <div className={cardClassName}>
              <div className={subTextClass}>Clouds</div>
              <div className="font-semibold">{current.clouds.all}%</div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Forecast */}
      {forecastLoading ? (
        <div className={`${cardClass} p-6 rounded-lg shadow`}>
          <h3 className={`text-xl font-bold mb-4 ${labelClass}`}>5-Day Forecast</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-12 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      ) : forecast ? (
        <div className={`${cardClass} p-6 rounded-lg shadow`}>
          <h3 className={`text-xl font-bold mb-4 ${labelClass}`}>5-Day Forecast</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.list
              .filter((_, index) => index % 8 === 0)
              .slice(0, 5)
              .map((f: ForecastItem, idx: number) => (
                <div key={idx} className={`text-center ${cardClassName}`}>
                  <div className={`font-medium text-sm mb-2 ${labelClass}`}>
                    {formatDate(f.dt)}
                  </div>
                  {f.weather[0] && (
                    <img
                      src={getWeatherIcon(f.weather[0].icon)}
                      alt={f.weather[0].description}
                      className="w-12 h-12 mx-auto mb-2"
                    />
                  )}
                  <div className="font-semibold text-lg">
                    {Math.round(f.main.temp)}{getTemperatureUnit()}
                  </div>
                  <div className={`text-xs capitalize ${subTextClass}`}>
                    {f.weather[0]?.description}
                  </div>
                  <div className={`text-xs ${subTextClass} mt-1`}>
                    {Math.round(f.main.temp_min)}{getTemperatureUnit()} / {Math.round(f.main.temp_max)}{getTemperatureUnit()}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : null}

      {/* Hourly Forecast */}
      {forecast && (
        <div className={`${cardClass} p-6 rounded-lg shadow`}>
          <h3 className={`text-xl font-bold mb-4 ${labelClass}`}>24-Hour Forecast</h3>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 min-w-max">
              {forecast.list.slice(0, 8).map((f: ForecastItem, idx: number) => (
                <div key={idx} className="text-center flex-shrink-0 w-34">
                  <div className={`text-sm font-medium mb-2 ${labelClass}`}>
                    {formatTime(f.dt)}
                  </div>
                  {f.weather[0] && (
                    <img
                      src={getWeatherIcon(f.weather[0].icon)}
                      alt={f.weather[0].description}
                      className="w-10 h-10 mx-auto mb-2"
                    />
                  )}
                  <div className="font-semibold">
                    {Math.round(f.main.temp)}{getTemperatureUnit()}
                  </div>
                  <div className={`text-xs ${subTextClass} mt-1`}>
                    {Math.round(f.main.humidity)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}