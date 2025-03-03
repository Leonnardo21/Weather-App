import { useState } from "react";
import { getWeather } from "../api/weather";

export default function WeatherApp(){
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const fetchWeather = async () => {
        if(!city) return;
        setLoading(true);
        setError("");
        
        const data = await getWeather(city);
        if(data){
            setWeather(data);
        }
        else{
            setError("Cidade não encontrada ou erro na API");
        }
        setLoading(false);
    };

    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <h1 className="text-4xl font-bold mb-6">Consulta de Clima</h1>
            <div className="flex gap-3 mb-6 w-full max-w-md">
                <input 
                    type="text"
                    placeholder="Digite a cidade"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="flex-1 p-3 border border-gray-700 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    onClick={fetchWeather}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg font-semibold shadow-md transition"
                >
                    Buscar
                </button>
            </div>
            <div className="text-center w-full max-w-md">
                {loading && <p className="text-lg">Carregando...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {weather && (
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 text-white">
                        <h2 className="text-2xl font-semibold">{weather.location.name}, {weather.location.country}</h2>
                        <p className="text-3xl font-bold mt-2">{weather.current.temp_c}°C</p>
                        <p className="text-lg mt-1">{weather.current.condition.text}</p>
                        <img className="mx-auto mt-3" src={weather.current.condition.icon} alt="Ícone do Clima"/>
                    </div>
                )}
            </div>
        </div>
    );
}