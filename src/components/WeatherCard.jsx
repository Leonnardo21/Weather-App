import { Cloud, Sun, CloudRain, MapPin, Wind, Droplets, Eye, Thermometer } from "lucide-react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes("sol") || conditionLower.includes("ensolarado") || conditionLower.includes("clear")) return Sun;
    if (conditionLower.includes("chuva") || conditionLower.includes("chuvoso") || conditionLower.includes("rain")) return CloudRain;
    return Cloud;
  };

  const WeatherIcon = getWeatherIcon(weather.current.condition.text);

  return (
    <div className="mt-8 space-y-6">
      <div className="bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-300" />
            <span className="text-white font-medium">
              {weather.location.name}, {weather.location.region}
            </span>
          </div>
          <div className="text-white/60 text-sm">
            {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-5xl font-bold text-white mb-2">
              {Math.round(weather.current.temp_c)}°
            </div>
            <div className="text-white/80 text-lg">
              {weather.current.condition.text}
            </div>
            <div className="text-white/60 text-sm flex items-center mt-1">
              <Thermometer className="w-4 h-4 mr-1" />
              Sensação: {Math.round(weather.current.feelslike_c)}°
            </div>
          </div>
          <div className="text-white/80 flex flex-col items-center">
            <WeatherIcon className="w-16 h-16 mb-2" />
            {weather.current.condition.icon && (
              <img 
                src={`https:${weather.current.condition.icon}`} 
                alt={weather.current.condition.text}
                className="w-16 h-16 -mt-16"
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <Wind className="w-6 h-6 text-blue-300 mx-auto mb-1" />
            <div className="text-white text-sm font-medium">{Math.round(weather.current.wind_kph)} km/h</div>
            <div className="text-white/60 text-xs">Vento</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <Droplets className="w-6 h-6 text-blue-300 mx-auto mb-1" />
            <div className="text-white text-sm font-medium">{weather.current.humidity}%</div>
            <div className="text-white/60 text-xs">Umidade</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <Eye className="w-6 h-6 text-blue-300 mx-auto mb-1" />
            <div className="text-white text-sm font-medium">{weather.current.vis_km} km</div>
            <div className="text-white/60 text-xs">Visibilidade</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
