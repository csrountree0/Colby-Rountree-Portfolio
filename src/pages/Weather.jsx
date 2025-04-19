import { useState, useEffect } from 'react';

function WeatherPage() {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get user's location
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    
                    // Get location name using browser's geocoding
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
                    );
                    const data = await response.json();
                    const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || 'Unknown';
                    const state = data.address?.state || data.address?.region || 'Unknown';
                    
                    setLocation(`${city}, ${state}`);

                    // Get weather data
                    const weatherResponse = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`
                    );
                    const weatherData = await weatherResponse.json();
                    setWeather(weatherData.current);
                    setLoading(false);
                } catch (err) {
                    setError('Failed to fetch weather data');
                    setLoading(false);
                }
            },
            (err) => {
                setError('Please enable location services to get weather data');
                setLoading(false);
            }
        );
    }, []);

    const getWeatherDescription = (code) => {
        const weatherCodes = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            71: 'Slight snow',
            73: 'Moderate snow',
            75: 'Heavy snow',
            77: 'Snow grains',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            85: 'Slight snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail'
        };
        return weatherCodes[code] || 'Unknown';
    };

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-white text-xl">Loading weather data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center">
                <span className="material-icons text-white text-8xl mb-4">error</span>
                <div className="text-white text-center text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="cursor-default flex-1 flex flex-col items-center justify-center mb-20">
            {location && (
                <div className="text-white text-2xl font-semibold mb-4">
                    {location}
                </div>
            )}
            <WeatherIcon code={weather.weather_code}/>

            <div className="text-white text-4xl font-bold mt-6 mb-2">
                {Math.round(weather.temperature_2m)}°F
            </div>
            <div className="text-white text-sml mb-4 opacity-80">
                {getWeatherDescription(weather.weather_code)}
            </div>
            <div className="grid grid-cols-2 gap-4 text-white">
                <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-sm opacity-80">Feels Like</div>
                    <div className="text-xl">{Math.round(weather.apparent_temperature)}°F</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-sm opacity-80">Humidity</div>
                    <div className="text-xl">{weather.relative_humidity_2m}%</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-sm opacity-80">Wind</div>
                    <div className="text-xl">{Math.round(weather.wind_speed_10m)} mph</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-sm opacity-80">Pressure</div>
                    <div className="text-xl flex items-baseline">
                        {Math.round(weather.pressure_msl)}
                        <span className="text-sm ml-0.5">hPa</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WeatherIcon({ code }) {
    if (code === 0) {
        return <span className="material-symbols-outlined text-white md-64">sunny</span>;
    } else if (code >= 1 && code <= 3) {
        return <span className="material-symbols-outlined text-white md-64">partly_cloudy_day</span>;
    } else if (code >= 45 && code <= 48) {
        return <span className="material-symbols-outlined text-white md-64">foggy</span>;
    } else if (code >= 51 && code <=67 || code === 80 || code === 81 || code === 82) {
        return <span className="material-symbols-outlined text-white md-64">rainy</span>;
    } else if (code >= 71 && code <= 75 || code === 85 || code === 86) {
        return <span className="material-symbols-outlined text-white md-64">weather_snowy</span>;
    } else if (code === 95 || code === 96 || code === 99) {
        return <span className="material-symbols-outlined text-white md-64">thunderstorm</span>;
    } else {
        return null;
    }
}


export default WeatherPage; 