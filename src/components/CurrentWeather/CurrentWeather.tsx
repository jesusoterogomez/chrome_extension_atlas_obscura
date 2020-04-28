import React, { useState, useEffect } from "react";
import { Weather } from "Types";
import { getPosition } from "utils/geolocation";
import { getWeather } from "utils/openweather";
import OpenWeatherIcon from "components/OpenWeatherIcon/OpenWeatherIcon";
import "./CurrentWeather.scss";

import { motion } from "framer-motion";
import { fadeIn, fadeInFromRight } from "Animations";

const CurrentWeather = () => {
    const [weather, setWeather] = useState<Weather | null>(null);

    useEffect(() => {
        fetchWeather();
    }, []);

    const fetchWeather = async () => {
        const position = await getPosition();

        const query = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        };

        const weather = await getWeather(query);
        setWeather(weather);
    };

    if (!weather) {
        return null;
    }

    const [weatherCondition] = weather.weather;

    return (
        <motion.div
            className="weather-container"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            <motion.h1
                variants={fadeInFromRight}
                className="weather-temperature"
            >
                <OpenWeatherIcon icon={weatherCondition.icon} />
                {Math.round(weather.main.temp)}°
            </motion.h1>
            <motion.h2
                variants={fadeInFromRight}
                className="weather-description"
            >
                {weatherCondition.description}
            </motion.h2>
        </motion.div>
    );
};

export default CurrentWeather;
