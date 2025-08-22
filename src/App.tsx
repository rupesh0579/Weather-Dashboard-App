import { lazy, Suspense, useEffect } from 'react';
import UserPanel from './components/UserPanel';
// import HistoryTable from './components/HistoryTable';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import useAuthStore from './store/authStore';
import usePrefStore from './store/prefStore';
const WeatherView = lazy(() => import('./components/weatherView'));
const SettingsPanel = lazy(() => import('./components/SettingPanel'));
const AuthPanel = lazy(() => import('./components/AuthPanel'));
const HistoryTable = lazy(() => import('./components/HistoryTable'));

function App() {
  const { isAuthenticated } = useAuthStore();
  const { theme } = usePrefStore();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <Suspense fallback={<div className="text-center py-6">Loading...</div>}>
          {!isAuthenticated ? (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center py-12">
                <h1 className="text-4xl font-bold text-purple-950 mb-4">
                  Weather Dashboard
                </h1>
                <p className="text-lg text-orange-800 mb-8">
                  Your comprehensive weather tracking application
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 mb-8">
                  <div className="flex flex-col items-center p-4">
                    <div className="text-3xl mb-2">🌤️</div>
                    <h3 className="font-semibold">Real-time Weather</h3>
                    <p>Get current weather and forecasts</p>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <div className="text-3xl mb-2">📊</div>
                    <h3 className="font-semibold">Weather History</h3>
                    <p>Track your weather searches</p>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <div className="text-3xl mb-2">⚙️</div>
                    <h3 className="font-semibold">Personalized Settings</h3>
                    <p>Customize your experience</p>
                  </div>
                </div>
              </div>
              <AuthPanel />
            </div>
          ) : (
            <div className="space-y-6">
              {/* User Welcome */}
              <UserPanel />

              {/* Main Weather Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <WeatherView />
                </div>
                <div className="space-y-6">
                  <SettingsPanel />
                </div>
              </div>

              {/* Weather History */}
              <HistoryTable />
            </div>
          )}
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;