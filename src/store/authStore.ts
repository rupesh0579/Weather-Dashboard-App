import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User) => void;
}

const mockLogin = async (
  credentials: LoginCredentials
): Promise<{ user: User; token: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  
  if (
    credentials.email === "admin@weather.com" &&
    credentials.password === "password"
  ) {
    return {
      user: {
        id: "1",
        name: "Weather Admin",
        email: credentials.email,
        preferences: {
          defaultCity: "Delhi",
          units: "metric",
          theme: "light",
        },
      },
      token: "mock-jwt-token-" + Date.now(),
    };
  }
  throw new Error("Invalid credentials");
};

const mockRegister = async (
  credentials: RegisterCredentials
): Promise<{ user: User; token: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (credentials.password !== credentials.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  return {
    user: {
      id: Date.now().toString(),
      name: credentials.name,
      email: credentials.email,
      preferences: {
        defaultCity: "Delhi",
        units: "metric",
        theme: "light",
      },
    },
    token: "mock-jwt-token-" + Date.now(),
  };
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await mockLogin(credentials);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Login failed",
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await mockRegister(credentials);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Registration failed",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),

      setUser: (user: User) => set({ user }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
