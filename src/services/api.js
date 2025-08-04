const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

export const searchLocation = async (locationInput) => {
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

export const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${lat},${lon}`);
                    const data = await response.json();
                    resolve(data.location.name);
                } catch (error) {
                    console.error("API fetch failed:", error);
                    reject("Failed to fetch location data.");
                }
            },
            (error) => {
                console.error("Geolocation failed:", error);
                reject("Unable to retrieve your location.");
            }
        );
    });
};


