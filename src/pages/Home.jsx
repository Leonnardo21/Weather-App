import { useState } from "react";
import { Search } from "lucide-react";
import WeatherCard from "../components/WeatherCard";
import {fetchWeatherCity} from "../services/weatherAPI";


const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchWeatherCity(city);
      setWeather(data);
      console.log(data);
    } catch (err) {
      setError(err.message || "Erro ao buscar clima. Verifique sua conexão.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-blue-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Consulta Clima
            </h1>
            <p className="text-white/70 text-lg">
              Descubra o clima em qualquer lugar do mundo
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl mb-6">
            <div className="relative">
              <input
                type="text"
                className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 
                         text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 
                         focus:border-transparent transition-all duration-300 text-lg"
                placeholder="Digite o nome da cidade..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="absolute right-2 top-2 bg-gradient-to-r from-blue-500 to-purple-600 
                         text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-700 
                         transition-all duration-300 transform hover:scale-105 disabled:opacity-50 
                         disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Search className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2 text-white/80">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-lg">Buscando informações do clima...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-200 text-center font-medium">{error}</p>
            </div>
          )}

          <WeatherCard weather={weather} />

          <div className="text-center mt-8 text-white/50 text-sm">
            <p>Digite o nome de qualquer cidade para consultar o clima</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;