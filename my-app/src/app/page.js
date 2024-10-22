"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "/src/components/ui/card";

export default function Pogoda() {
  const [pogoda, setpogoda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    
  useEffect(() => {
    const getData = async () => {

      const lat = "52.178890"
      const lon = "21.573210"
      const key = "7affd7d3a676a87d7ba537645129bb6a"

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setpogoda(json);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="flex flex-row flex-wrap items-center justify-center h-screen">
          <Card  className="p-0 w-[300px] h-[400px] flex items-center justify-center">
            <CardContent className="p-0">
              <div className="flex items-center justify-center">
                <div className="text-center flex flex-col items-center justify-center">
                  <h1 className="text-2xl font-semibold">Minśk Mazowiecki</h1>  
                  <h2 className="text-xl text-gray-600">{pogoda.main.temp}℃</h2> 
                </div> 
              </div>
            </CardContent>
          </Card>
    </div>
  );
}