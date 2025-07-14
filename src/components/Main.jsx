import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getLocation, getTemperatureInfo, getWeatherCondition } from "../services/api";


const Main = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(false);





    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        // if (loading) return;

        // setLoading(true);

        try {
            const searchlocation = await getLocation(searchQuery);
            const searchTempInfo = await getTemperatureInfo(searchQuery);
            const searchWeatherCond = await getWeatherCondition(searchQuery);
            setWeatherData({ ...searchlocation, ...searchTempInfo, ...searchWeatherCond });   //used ... to merger these states

            setError(null);

        } catch (err) {
            console.log(err);
            setError("Failed to fetch weather data. Please try again.");
        } finally {
            // setLoading(false);
        }

    }


    return (

        <div className='w-full bg-sky-300 py-[3rem] flex justify-center' >
            <div className="container w-[50%] px-[2rem] py-[1rem] bg-emerald-500 rounded-md flex flex-col justify-center gap-[1rem] ">

                <form className="add-tasks bg-amber-200  flex justify-evenly p-[1rem]" onSubmit={handleSearch} >
                    <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Enter City name'
                        className='w-[70%] text-center p-[0.5rem] text-2xl bg-blue-300 text-white' />

                    <button className='px-[2rem] py-[1rem] cursor-pointer bg-red-400' type='submit' ><FontAwesomeIcon icon={faSearch} /></button>
                </form>

                {error && <div className="error-message">{error}</div>}

                {(searchQuery.trim()) ? (Object.keys(weatherData).length > 0) && (
                    <div class=" space-y-3 flex flex-col " id="weather-info">
                        <h2 class="text-lg font-semibold">City: <span id="city" class="text-gray-700">  {weatherData.name}</span></h2>
                        <h2 class="text-lg font-semibold">Region: <span id="region" class="text-gray-700">{weatherData.region}</span></h2>
                        <h2 class="text-lg font-semibold">Country: <span id="country" class="text-gray-700">{weatherData.country}</span></h2>
                        <p class="text-lg font-semibold">Weather: <span id="weather" class="font-medium text-yellow-600">{weatherData.text}</span></p>
                        <p class="text-lg font-semibold">Temperature (C): <span id="temp_c"
                            class="font-medium text-blue-800">{weatherData.temp_c}</span></p>
                        <p class="text-lg font-semibold">Temperature (F): <span id="temp_f"
                            class="font-medium text-blue-800">{weatherData.temp_f}</span></p>
                        <p class="text-lg font-semibold">Last Updated: <span id="date" class="text-gray-600">{weatherData.last_updated}</span></p>
                        <p class="text-lg font-semibold">Wind Speed: <span id="wind-speed"
                            class="font-medium text-purple-500">{weatherData.wind_kph} Km/hr</span> </p>
                        <p>Latitude: <span id="latitude" class="font-medium text-gray-500">{weatherData.lat}</span></p>
                        <p>Longitude: <span id="longitude" class="font-medium text-gray-500">{weatherData.lon}</span></p>
                    </div>
                )
                    :
                    (<p>...</p>)
                }

            </div>
        </div>
    )
}

export default Main
