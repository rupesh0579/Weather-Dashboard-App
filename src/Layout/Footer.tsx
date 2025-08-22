
const Footer = () => {
  return (
   <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm">© 2025 Weather Dashboard. All rights reserved.</p>
            <p className="text-xs text-gray-400 mt-1">
              Powered by OpenWeatherMap API
            </p>
          </div>
          
          <div className="flex space-x-6 text-sm">
            <span className="text-gray-400">Features:</span>
            <span className="text-gray-300">Real-time Weather</span>
            <span className="text-gray-300">5-Day Forecast</span>
            <span className="text-gray-300">Weather History</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer