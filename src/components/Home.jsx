import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getLocation, getTemperatureInfo, getWeatherCondition } from "../services/api";


const Main = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(false);

    const infoClasses = "text lg:text-lg font-semibold";



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
            <div className="container w-[85%] lg:w-[45%] h-auto px-[1rem]  py-[1.4rem]  lg:py-[2.5rem] rounded-[15px] bg-sky-200 flex flex-col items-center gap-[1rem]" >

                <form className="add-tasks flex justify-evenly p-[1rem rounded-[10px]  gap-2" onSubmit={handleSearch} >
                    <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Enter City name'
                        className='w-[80%] text-center p-[0.2rem] lg:p-[0.5rem] lg:text-2xl bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition' />

                    <button className='px-[1rem] py-[0.5rem] cursor-pointer text-white bg-[#f145f7] hover:bg-[#c629c6] active:bg-[#a445c9]   rounded-md lg:text-2xl' type='submit' title='Search' ><FontAwesomeIcon icon={faSearch} /></button>
                </form>

                {error && <div className="error-message">{error}</div>}

                {(searchQuery.trim()) && (Object.keys(weatherData).length > 0) && (
                    <div className=" space-y-3 flex flex-col w-[97%] lg:w-[60%] p-3" id="weather-info">
                        <h2 className={infoClasses} >City: <span id="city" className="text-gray-700">  {weatherData.name}</span></h2>
                        <h2 className={infoClasses}>Region: <span id="region" className="text-gray-700">{weatherData.region}</span></h2>
                        <h2 className={infoClasses}>Country: <span id="country" className="text-gray-700">{weatherData.country}</span></h2>
                        <p className={infoClasses}>Weather: <span id="weather" className="font-medium text-yellow-600">{weatherData.text}</span></p>
                        <p className={infoClasses}>Temperature (C): <span id="temp_c"
                            className="font-medium text-blue-800">{weatherData.temp_c}</span></p>
                        <p className={infoClasses}>Temperature (F): <span id="temp_f"
                            className="font-medium text-blue-800">{weatherData.temp_f}</span></p>
                        <p className={infoClasses}>Last Updated: <span id="date" className="text-gray-600">{weatherData.last_updated}</span></p>
                        <p className={infoClasses}>Wind Speed: <span id="wind-speed"
                            className="font-medium text-purple-500">{weatherData.wind_kph} Km/hr</span> </p>
                        <p className={infoClasses} >Latitude: <span id="latitude" className="font-medium text-gray-500">{weatherData.lat}</span></p>
                        <p className={infoClasses} >Longitude: <span id="longitude" className="font-medium text-gray-500">{weatherData.lon}</span></p>
                    </div>
                )

                }

            </div>
        </div>
    )
}

export default Main
