import { useState } from "react";
import WeatherCard from "../components/WeatherCard.jsx";
import { fetchWeatherCity } from "../services/weatherAPI";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchWeatherCity(city);
      if (data.error) {
        setError("Cidade não encontrada.");
        setWeather(null);
      } else {
        setWeather(data);
        console.log(data)
      }
    } catch {
      setError(error.message || "Erro ao buscar clima.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-300 to-blue-600 p-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          🌦️ Consulta do Clima
        </h1>

        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-l-lg border border-blue-300 focus:outline-none"
            placeholder="Digite o nome da cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </div>

        {loading && (
          <p className="text-center text-blue-700 font-medium animate-pulse">
            Carregando...
          </p>
        )}
        {error && <p className="text-center text-red-600 font-semibold">{error}</p>}

        <WeatherCard weather={weather} />
      </div>
    </div>
  );
};

export default Home;