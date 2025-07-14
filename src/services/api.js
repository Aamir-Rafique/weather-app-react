const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

export const getLocation = async (locationInput) => {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${locationInput}`);
    const data = await response.json();
    return data.location;
}

export const getTemperatureInfo = async (locationInput) => {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${locationInput}`);
    const data = await response.json();
    return data.current;
}

export const getWeatherCondition = async (locationInput) => {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${locationInput}`);
    const data = await response.json();
    return data.current.condition;
}

