import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "../store/authStore";
import type { LoginCredentials, RegisterCredentials } from "../types/auth";

export default function AuthPanel() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    login,
    register: registerUser,
    isLoading,
    error,
    clearError,
  } = useAuthStore();

  const loginForm = useForm<LoginCredentials>();
  const registerForm = useForm<RegisterCredentials>();

  const onLoginSubmit = async (data: LoginCredentials) => {
    console.log("loginData:", data);
    try {
      await login(data);
    } catch {
      // Error is handled by the store
    }
  };

  const onRegisterSubmit = async (data: RegisterCredentials) => {
    console.log("register data:", data);
    try {
      await registerUser(data);
    } catch {
      // Error is handled by the store
    }
  };

  const toggleBtn = () => {
    setIsLogin(!isLogin);
    clearError();
    loginForm.reset();
    registerForm.reset();
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            isLogin
              ? "bg-purple-800 text-white shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            !isLogin
              ? "bg-purple-800 text-white shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Register
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {isLogin ? (
        <form
          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...loginForm.register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="admin@weather.com"
            />
            {loginForm.formState.errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {loginForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...loginForm.register("password", {
                required: "Password is required",
              })}
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="password"
            />
            {loginForm.formState.errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      ) : (
        <form
          onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              {...registerForm.register("name", {
                required: "Name is required",
              })}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your name"
            />
            {registerForm.formState.errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {registerForm.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...registerForm.register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="your@email.com"
            />
            {registerForm.formState.errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {registerForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...registerForm.register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Choose a password"
            />
            {registerForm.formState.errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {registerForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              {...registerForm.register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === registerForm.watch("password") ||
                  "Passwords do not match",
              })}
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Confirm your password"
            />
            {registerForm.formState.errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {registerForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>
      )}

      <div className="mt-4 text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={toggleBtn}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
}
