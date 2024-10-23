'use client';
import { useState, useEffect } from "react";
import {
  Sun,
  CloudSun,
  CloudRain,
  Cloud,
  Thermometer,
  Wind,
  AirVent
} from 'lucide-react';

export default function Home() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const lat = "52.17935";
      const lon = "21.57251";
      const apiKey = "d8d7ff55869412fa31237eee1bdf67ca";
      
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const data = await response.json();
        console.log(data);
        setWeatherData([data]);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="w-full h-screen bg-gray-800 text-white flex items-center justify-center">
      {weatherData.length > 0 && weatherData.map((item, index) => (
        <div className="flex flex-row flex-wrap gap-4 justify-center" key={index}>
          {item.list.map((forecast, idx) => {
            if (idx % 8 === 0) {
              return (
                <div
                  className={`${
                    idx === 0 
                      ? 'flex flex-col items-center w-full h-[300px] bg-gray-700' 
                      : 'flex flex-col items-center border-2 border-slate-700 w-[400px] h-[300px] bg-gray-600 p-4 gap-2'
                  }`}
                  key={idx}
                >
                  <h1 className="text-2xl font-bold">
                    {(forecast.main.temp - 273.15).toFixed(1)}°C
                  </h1>
                  <h2 className="text-lg">{forecast.dt_txt}</h2>
                  {forecast.weather[0].main === "Clouds" && <Cloud color="white" size={50} />}
                  {forecast.weather[0].main === "Clear" && <Sun color="white" size={50} />}
                  {forecast.weather[0].main === "Rain" && <CloudRain color="white" size={50} />}
                  <p className="flex items-center gap-2">
                    <Wind /> {forecast.main.pressure} hPa | {forecast.wind.speed} m/s
                    <Thermometer /> {(forecast.main.feels_like - 273.15).toFixed(1)}°C
                    <AirVent /> {forecast.main.humidity}%
                  </p>
                </div>
              );
            }
            return null; 
          })}
        </div>
      ))}
    </div>
  );
}
