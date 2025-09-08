import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserPanel from "./components/UserPanel";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import useAuthStore from "./store/authStore";
import usePrefStore from "./store/prefStore";
import Dashboard from "./Layout/Dashboard";
// import WeatherView from "./components/WeatherView";
const WeatherView = lazy(() => import("./components/WeatherView"))
const HistoryTable = lazy(() => import("./components/HistoryTable"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));

function App() {
  const { isAuthenticated } = useAuthStore();
  const { theme } = usePrefStore();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <BrowserRouter>
      <div
        className={`flex flex-col min-h-screen ${
          theme === "dark" ? "dark bg-gray-700" : "bg-gray-50"
        }`}
      >
        <Header />

        <main className="flex-1 container mx-auto px-4 md:px-28 py-6 space-y-6">
          <Suspense
            fallback={<div className="text-center py-6">Loading...</div>}
          >
            <Routes>
              {/*Login Route */}
              <Route
               path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" replace />
                  ) : (
                    <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="flex justify-center items-center">
                        <Dashboard />
                      </div>
                      <div className="flex justify-center items-center">
                        <Login />
                      </div>
                    </div>
                  )
                }
              />

              <Route
                path="/register"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" />
                  ) : (
                    <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="flex justify-center items-center">
                        <Dashboard />
                      </div>
                      <div className="flex justify-center items-center">
                        <Register />
                      </div>
                    </div>
                  )
                }
              />

              {/* Home / Dashboard Route */}
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <div className="space-y-6" >
                      <UserPanel />
                      <div className="w-full">
                        <div className="lg:col-span-2">
                          <WeatherView />
                        </div>
                        <div className="space-y-6"></div>
                      </div>
                      <HistoryTable />
                    </div>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              <Route
                path="*"
                element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
              />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;