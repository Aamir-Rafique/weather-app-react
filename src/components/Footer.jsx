import React from 'react'

const Footer = () => {
    return (
        <footer className=" w-full text-sm text-center relative bottom-0 pb-3   text-black text-[0.9rem]">    
            <p>
                Made with ❤️ by <a href="https://github.com/Aamir-Rafique" target="_blank" rel="noopener"
                    className="text-[#1898bf] hover:underline">Aamir Rafique</a>
            </p>
            <p>
                Weather data provided by <a href="https://www.weatherapi.com/" target="_blank" rel="noopener"
                    className="text-[#1095bd] hover:underline">WeatherAPI</a>
            </p>
        </footer>
    )
}

export default Footer
