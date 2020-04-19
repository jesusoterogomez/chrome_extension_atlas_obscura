import React, { useState, useEffect } from "react";
import { Weather } from "Types";
import { getPosition } from "utils/geolocation";
import { getWeather } from "utils/openweather";
import OpenWeatherIcon from "components/OpenWeatherIcon/OpenWeatherIcon";
import "./CurrentWeather.scss";

import { motion, AnimationProps } from "framer-motion";

const weather_container: AnimationProps["variants"] = {
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            delayChildren: 0.3,
            staggerChildren: 0.1,
        },
    },
    hidden: { opacity: 0 },
};

const weather_item: AnimationProps["variants"] = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, x: +50, transition: { duration: 0.5 } },
};

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
            variants={weather_container}
        >
            <motion.h1 variants={weather_item} className="weather-temperature">
                <OpenWeatherIcon icon={weatherCondition.icon} />
                {Math.round(weather.main.temp)}°
            </motion.h1>
            <motion.h2 variants={weather_item} className="weather-description">
                {weatherCondition.description}
            </motion.h2>
        </motion.div>
    );
};

export default CurrentWeather;
