import useAuthStore from "../store/authStore";

const Header = () => {
    const { isAuthenticated, user } = useAuthStore();
  return (
   <header className="bg-gradient-to-r from-purple-800 to-blue-800 text-white shadow-lg px-4 md:px-24">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🌤️</div>
            <h1 className="text-xl font-bold">Weather Dashboard</h1>
          </div>
           {isAuthenticated && user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm opacity-90">
                Hello, {user.name.split(' ')[0]}
              </span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;