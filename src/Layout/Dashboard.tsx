const Dashboard = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 hidden sm:block">
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
    </div>
  );
};

export default Dashboard;
