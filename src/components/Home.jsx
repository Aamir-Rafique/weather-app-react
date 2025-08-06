import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { searchLocation, getTemperatureInfo, getWeatherCondition, getCurrentLocation } from "../services/api";


const Main = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setisLoading] = useState(true);


    const infoClasses = "text lg:text-lg font-semibold";

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            setisLoading(true);
            const searchlocation = await searchLocation(searchQuery);
            const searchTempInfo = await getTemperatureInfo(searchQuery);
            const searchWeatherCond = await getWeatherCondition(searchQuery);
            setWeatherData({ ...searchlocation, ...searchTempInfo, ...searchWeatherCond });   //used ... to merge these states
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to fetch weather data. Please try again.");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setisLoading(false);
        }, 1200);
    }, [handleSearch])


    const handleCurrentLocation = async (e) => {
        try {
            alert("Fetching your live location please wait!");
            const location = await getCurrentLocation();
            setSearchQuery(location);
            console.log(location);
            const searchlocation = await searchLocation(location);
            const searchTempInfo = await getTemperatureInfo(location);
            const searchWeatherCond = await getWeatherCondition(location);
            setWeatherData({ ...searchlocation, ...searchTempInfo, ...searchWeatherCond });   //used ... to merge these states
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to fetch weather data. Please try again.");
        }
    }

    return (


        <div className='w-full py-[3rem] flex justify-center font-sans' >

            {(!searchQuery.trim()) && (<div className='mt-12' ></div>)}

            <div className="container w-[85%] shadow-lg lg:w-[45%] h-auto px-[1rem]  py-[1.4rem]  lg:py-[2.5rem] rounded-[15px] bg-sky-400 flex flex-col items-center gap-[1rem]" >

                <form className="add-tasks flex justify-evenly p-[1rem rounded-[10px]  gap-2" onSubmit={handleSearch} >
                    <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Enter City name'
                        className='w-[80%] text-center p-[0.2rem] lg:p-[0.5rem] lg:text-2xl text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-[#ffffffea] backdrop-blur-sm' />

                    <button className='bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-600 transition cursor-pointer  active:bg-blue-600    lg:text-2xl' type='submit' title='Search' ><FontAwesomeIcon icon={faSearch} /></button>
                    <button title="Use Current Location" onClick={handleCurrentLocation} className="lg:text-2xl bg-gray-600 cursor-pointer text-white  px-4 py-2 rounded-md hover:bg-gray-700 active:bg-gray-800 transition"> <FontAwesomeIcon icon={faLocationDot} /></button>

                </form>


                {
                    (searchQuery.trim() && 
                    isLoading ?
                    <img src="./public/icons/spinner.gif" alt="" />
                        :
                        (error ? <div className="error-message">{error}</div> : !isLoading) && (Object.keys(weatherData).length > 0) && (
                            <div className=" space-y-3 flex flex-col w-[97%] lg:w-[70%] p-3 lg:px-10 bg-sky-300  hover:bg-purple-200 transition-all duration-300 rounded-2xl" id="weather-info">
                                <h2 className={infoClasses} >City: <span id="city" className="text-gray-700">  {weatherData.name}</span></h2>
                                <h2 className={infoClasses}>Region: <span id="region" className="text-gray-700">{weatherData.region}</span></h2>
                                <h2 className={infoClasses}>Country: <span id="country" className="text-gray-700">{weatherData.country}</span></h2>
                                <p className={infoClasses}>🌫️ Weather: <span id="weather" className="font-medium text-yellow-600">{weatherData.text}</span></p>
                                <p className={infoClasses}>🌡️ Temperature (C): <span id="temp_c"
                                    className="font-medium text-blue-800">{weatherData.temp_c}</span></p>
                                <p className={infoClasses}>🌡️ Temperature (F): <span id="temp_f"
                                    className="font-medium text-blue-800">{weatherData.temp_f}</span></p>
                                <p className={infoClasses} >Last Updated: <span id="date" className="text-gray-600">{weatherData.last_updated}</span></p>
                                <p className={infoClasses}>Wind Speed: <span id="wind-speed"
                                    className="font-medium text-purple-500">{weatherData.wind_kph} Km/hr</span> </p>
                                <p className={infoClasses} >Latitude: <span id="latitude" className="font-medium text-gray-500">{weatherData.lat}</span></p>
                                <p className={infoClasses} >Longitude: <span id="longitude" className="font-medium text-gray-500">{weatherData.lon}</span></p>
                            </div>
                        ))
                }

            </div>
        </div>
    )
}

export default Main
