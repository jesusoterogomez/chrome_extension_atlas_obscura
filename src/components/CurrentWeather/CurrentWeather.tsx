import React, { useState, useEffect, useCallback } from "react";
import { Weather } from "Types";
import {
    getPosition,
    isPermissionDenied,
    queryPermission,
} from "utils/geolocation";
import { getWeather } from "utils/weather";
import { getStorage, setStorage, KEYS } from "utils/storage";
import OpenWeatherIcon from "components/OpenWeatherIcon";
import "./CurrentWeather.scss";

import { motion } from "framer-motion";
import { fadeIn, fadeInFromRight } from "Animations";

type Status =
    | "loading"
    | "prompt"
    | "fetching"
    | "granted"
    | "denied"
    | "dismissed";

const CurrentWeather = () => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [status, setStatus] = useState<Status>("loading");

    const fetchWeather = useCallback(async () => {
        setStatus("fetching");

        try {
            const position = await getPosition();

            const data = await getWeather({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });

            setWeather(data);
            setStatus("granted");
        } catch (error) {
            setStatus(isPermissionDenied(error) ? "denied" : "dismissed");
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            const permission = await queryPermission();

            // Browser says location is granted — always fetch,
            // even if the user previously dismissed the prompt.
            if (permission === "granted") {
                await fetchWeather();
                return;
            }

            const dismissed = await getStorage(KEYS.LOCATION_DISMISSED);

            // Browser says location is denied
            if (permission === "denied") {
                setStatus(dismissed ? "dismissed" : "denied");
                return;
            }

            // Permission is "prompt" (or API unavailable)
            // Only show the opt-in button if not dismissed
            setStatus(dismissed ? "dismissed" : "prompt");
        };

        init();
    }, [fetchWeather]);

    const handleDismiss = async () => {
        await setStorage(KEYS.LOCATION_DISMISSED, true);
        setStatus("dismissed");
    };

    if (
        status === "loading" ||
        status === "fetching" ||
        status === "dismissed"
    ) {
        return null;
    }

    if (status === "prompt") {
        return (
            <motion.div
                className="weather-container"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <motion.button
                    className="weather-enable-button"
                    variants={fadeInFromRight}
                    onClick={fetchWeather}
                >
                    Enable weather reports
                </motion.button>
                <motion.p
                    className="weather-enable-hint"
                    variants={fadeInFromRight}
                >
                    Your browser will ask for location access
                </motion.p>
            </motion.div>
        );
    }

    if (status === "denied") {
        return (
            <motion.div
                className="weather-container"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <motion.p
                    className="location-prompt"
                    variants={fadeInFromRight}
                >
                    Weather requires location access.
                    <br />
                    Allow location in your browser's site settings for this
                    extension, then refresh.
                </motion.p>
                <motion.div
                    className="location-prompt-actions"
                    variants={fadeInFromRight}
                >
                    <button
                        className="location-prompt-button"
                        onClick={handleDismiss}
                    >
                        Don't show again
                    </button>
                </motion.div>
            </motion.div>
        );
    }

    if (!weather) {
        return null;
    }

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
                <OpenWeatherIcon icon={weather.icon} />
                {Math.round(weather.temperature)}°
            </motion.h1>
            <motion.h2
                variants={fadeInFromRight}
                className="weather-description"
            >
                {weather.description}
            </motion.h2>
        </motion.div>
    );
};

export default CurrentWeather;
