import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/current.json";
console.log("API Key:", API_KEY);
console.log("API Key:", import.meta.env.VITE_WEATHER_API_KEY);

export const getWeather = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { key: API_KEY, q: city, lang: "pt" },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do clima: ", error);
    return null;
  }
};
