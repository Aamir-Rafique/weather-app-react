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
            setWeatherData({ ...searchlocation, ...searchTempInfo, ...searchWeatherCond });   //used ... to merge these states

            setError(null);

        } catch (err) {
            console.log(err);
            setError("Failed to fetch weather data. Please try again.");
        } finally {
            // setLoading(false);
        }

    }

    return (

        <div className='w-full py-[3rem] flex justify-center font-sans' >
            <div className="container w-[45%] h-auto px-[1rem] py-[2.5rem]  rounded-[15px] bg-purple-200 flex flex-col items-center gap-[1rem] ">

                <form className="add-tasks flex justify-evenly p-[1rem rounded-[10px]  gap-2" onSubmit={handleSearch} >
                    <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Enter City name'
                        className='w-[80%] text-center p-[0.5rem] text-2xl bg-white text-black rounded-md' />

                    <button className='px-[2rem] py-[0.5rem] cursor-pointer text-white bg-purple-500 rounded-md text-2xl' type='submit' title='Search' ><FontAwesomeIcon icon={faSearch} /></button>
                </form>

                {error && <div className="error-message">{error}</div>}

                {(searchQuery.trim()) && (Object.keys(weatherData).length > 0) && (
                    <div class=" space-y-3 flex flex-col w-[60%] p-3" id="weather-info">
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

                }

            </div>
        </div>
    )
}

export default Main
