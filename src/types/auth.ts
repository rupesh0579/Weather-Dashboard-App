export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  preferences?: {
    defaultCity: string;
    units: "metric" | "imperial";
    theme: "light" | "dark";
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}
