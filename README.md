# Weather Dashboard Application

A comprehensive weather tracking application built with React, TypeScript, and modern web technologies.

## 🌟 Features

## 1. User Authentication
- **Login & Registration**: Secure user authentication with form validation
- **Persistent Sessions**: User sessions are maintained across browser restarts
- **User Profiles**: Store user preferences and settings

## 2. Weather Data Display
- **Current Weather**: Real-time weather data with detailed metrics
- **5-Day Forecast**: Extended weather forecast with hourly breakdowns
- **24-Hour Forecast**: Detailed hourly weather predictions
- **Multiple Cities**: Search and switch between different cities
- **Favorite Cities**: Save frequently checked cities for quick access

## 3. User Settings & Preferences
- **Temperature Units**: Switch between Celsius and Fahrenheit
- **Default City**: Set your preferred default city
- **Theme Selection**: Light and dark theme support
- **Favorite Cities Management**: Add/remove cities from favorites
- **Settings Persistence**: All preferences are saved automatically

## 4. Weather History Tracking
- **Automatic Tracking**: All weather searches are automatically saved
- **Searchable History**: Filter through your weather search history
- **Sortable Data**: Sort by date, city, temperature, etc.
- **Data Management**: Clear history or individual entries

### 5. Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet & Desktop**: Responsive layouts for all screen sizes
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Interactive Elements**: Smooth transitions and hover effects

## 6. State Management
- **Zustand**: Lightweight and efficient state management
- **Persistent Storage**: Settings and auth state persist across sessions
- **Real-time Updates**: Instant updates across components

## 7. Data Fetching & Caching
- **React Query**: Efficient data fetching with automatic caching
- **Error Handling**: Comprehensive error handling and retry logic
- **Loading States**: Smooth loading indicators
- **Stale Time Management**: Optimized cache invalidation

## 8. Form Handling
- **React Hook Form**: Efficient form management with validation
- **Real-time Validation**: Instant feedback on form inputs
- **Error Display**: Clear error messages and validation states

## 9. Data Presentation
- **React Table**: Advanced table features for weather history
- **Sorting & Filtering**: Interactive data manipulation

# 10. HTTP Requests
- **Axios**: Robust HTTP client with interceptors
- **Request/Response Interceptors**: Automatic token handling
- **Error Handling**: Centralized error management

# Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-dashboard-app
   ```

2. **Install dependencies**
   npm install

3. **Set up environment variables**
   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Update the `WEATHER_API_KEY` in `src/api/weatherServices.ts`

4. **Start the development server**
   npm run dev

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── AuthPanel.tsx    # Login/Registration component
│   ├── weatherView.tsx  # Main weather display
│   ├── HistoryTable.tsx # Weather history table
│   ├── SettingPanel.tsx # User settings
│   └── UserPanel.tsx    # User info display
├── Layout/              # Layout components
│   ├── Header.tsx       # App header
│   └── Footer.tsx       # App footer
├── store/               # Zustand stores
│   ├── authStore.ts     # Authentication state
│   └── prefStore.ts     # User preferences
├── api/                 # API services
│   ├── axiosSetup.ts    # Axios configuration
│   └── weatherServices.ts # Weather API calls
├── types/               # TypeScript type definitions
│   ├── auth.ts          # Authentication types
│   └── weather.ts       # Weather data types
└── utils/               # Utility functions
```

## 🧪 Technologies Used

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand with persistence
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Table Component**: TanStack Table
- **Build Tool**: Vite
- **Development**: ESLint, TypeScript

## 🔑 Demo Credentials

For testing purposes, use these credentials:
- **Email**: `admin@weather.com`
- **Password**: `password`

##  Features in Detail

## Authentication Flow
- Secure login/registration with validation
- Password confirmation for registration
- Persistent authentication state
- Automatic logout functionality

### Weather Display
- Current weather with comprehensive metrics
- Temperature, humidity, wind speed, pressure
- Weather icons and descriptions
- 5-day and 24-hour forecasts
- City search with autocomplete

# Data Management
- Automatic weather history tracking
- Sortable and filterable history table
- Persistent user preferences
- Favorite cities management

# User Experience
- Responsive design for all devices
- Loading states and error handling
- Smooth animations and transitions
- Intuitive navigation and interactions

##  API Integration

The app integrates with the OpenWeatherMap API for:
- Current weather data
- 5-day weather forecasts
- City search functionality
- Weather icons and descriptions

<!-- link -->
[OpenWeatherMap API](https://openweathermap.org/api)

# The app supports:
- Light/Dark theme switching
- Temperature unit preferences (Celsius/Fahrenheit)
- Customizable default cities
- Persistent user settings

**Start the development server**
   npm run dev 
