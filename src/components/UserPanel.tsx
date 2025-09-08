import { useState } from "react";
import useAuthStore from "../store/authStore";
import usePrefStore from "../store/prefStore";
import SettingsPanel from "./SettingPanel";

export default function UserPanel() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { defaultCity, units } = usePrefStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="relative">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Welcome back, {user.name}!
              </h3>
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
            <button onClick={toggleDrawer} className="cursor-pointer">
              ⚙️
            </button>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Side Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-1/3 rounded-l-2xl bg-gray-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Settings & Preferences
            </h3>
            <button onClick={closeDrawer} className="text-gray-900 font-bold cursor-pointer">
              ✕
            </button>
          </div>
          <SettingsPanel />
        </div>
      </div>

      {isDrawerOpen && (
        <div
          
          className="fixed inset-0 z-40 bg-black/30"
          onClick={closeDrawer}
        ></div>
      )}
    </div>
  );
}
