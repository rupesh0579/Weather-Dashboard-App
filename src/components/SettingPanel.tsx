import { useForm } from "react-hook-form";
import usePrefStore from "../store/prefStore";
import useAuthStore from "../store/authStore";

type SettingsForm = {
  defaultCity: string;
  units: "metric" | "imperial";
  theme: "light" | "dark";
};

export default function SettingsPanel() {
  const {
    defaultCity,
    units,
    theme,
    favorites,
    setDefaultCity,
    setUnits,
    setTheme,
    addToFavorites,
    removeFromFavorites,
    clearHistory,
  } = usePrefStore();

  const { user, setUser } = useAuthStore();

  const { register, handleSubmit, watch, setValue } = useForm<SettingsForm>({
    defaultValues: { defaultCity, units, theme },
  });

  const onSubmit = (data: SettingsForm) => {
    setDefaultCity(data.defaultCity);
    setUnits(data.units);
    setTheme(data.theme);

    // Update user preferences if logged in
    if (user) {
      setUser({
        ...user,
        preferences: {
          defaultCity: data.defaultCity,
          units: data.units,
          theme: data.theme,
        },
      });
    }
  };

  const watchedCity = watch("defaultCity");

  const handleAddToFavorites = () => {
    if (watchedCity && !favorites.includes(watchedCity)) {
      addToFavorites(watchedCity);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <h3 className="text-xl font-bold text-gray-800">
        Settings & Preferences
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">General</h4>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default City
            </label>
            <div className="flex space-x-2">
              <input
                {...register("defaultCity", {
                  required: "Default city is required",
                })}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter city name"
              />
              <button
                type="button"
                onClick={handleAddToFavorites}
                disabled={!watchedCity || favorites.includes(watchedCity)}
                className="px-3 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Add to Favorites
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temperature Units
            </label>
            <select
              {...register("units")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="metric">Metric (°C, m/s)</option>
              <option value="imperial">Imperial (°F, mph)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme
            </label>
            <select
              {...register("theme")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        {/* Favorite Cities */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">
            Favorite Cities
          </h4>
          {favorites.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {favorites.map((city) => (
                <div
                  key={city}
                  className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  <span>{city}</span>
                  <button
                    type="button"
                    onClick={() => removeFromFavorites(city)}
                    className="ml-2 text-purple-900 hover:text-purple-800 font-bold"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No favorite cities added yet.
            </p>
          )}
        </div>

        {/* Data Management */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">
            Data Management
          </h4>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={clearHistory}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
            >
              Clear Weather History
            </button>
            <button
              type="button"
              onClick={() => {
                setValue("defaultCity", "Delhi");
                setValue("units", "metric");
                setValue("theme", "light");
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
            >
              Reset to Defaults
            </button>
          </div>
        </div>

        <div className="border-t pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
          >
            Save Settings
          </button>
        </div>
      </form>

      {/* User Info */}
      {user && (
        <div className="border-t pt-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Account Information
          </h4>
          <div className="bg-gray-100 p-3 rounded">
            <p className="text-sm">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-sm">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
