const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return(

    <div className="mt-6 text-center">
      <h2 className="text-2xl font-bold text-blue-900">
        {weather.location.name}, {weather.location.region}
      </h2>
      <p className="text-gray-700">{weather.location.country}</p>

      <div className="flex justify-center items-center mt-4 gap-4">
        <img
          src={weather.current.condition.icon}
          alt={weather.current.condition.text}
          className="w-20 h-20"
        />
        <div>
          <p className="text-5xl font-extrabold text-blue-800">
            {weather.current.temp_c}°C
          </p>
          <p className="text-sm text-gray-600">
            Sensação: {weather.current.feelslike_c}°C
          </p>
        </div>
      </div>

      <p className="mt-4 text-lg text-blue-700 italic">
        {weather.current.condition.text}
      </p>

      <div className="mt-4 text-sm text-gray-600">
        Última atualização: {weather.current.last_updated}
      </div>
    </div>
  );
};

export default WeatherCard;
