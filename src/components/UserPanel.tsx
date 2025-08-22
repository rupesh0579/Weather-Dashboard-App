import useAuthStore from "../store/authStore";
import usePrefStore from "../store/prefStore";

export default function UserPanel() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { defaultCity, units } = usePrefStore();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Welcome back, {user.name}!</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Current Settings:</span>
            <div className="mt-1">
              <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-2">
                📍 {defaultCity}
              </span>
              <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
                🌡️ {units === "metric" ? "Celsius" : "Fahrenheit"}
              </span>
            </div>
          </div>
          
          <button
            onClick={logout}
            className=" bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}