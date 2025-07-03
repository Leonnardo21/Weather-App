export const fetchWeatherCity = async (city) => {
  const apiKey = "889bb08b233b436494b114827250303";
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
      city
    )}&lang=pt`
  );
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data;
};
