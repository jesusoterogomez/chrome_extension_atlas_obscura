import qs from "qs";
import { Weather } from "Types";
import { getStorage, KEYS, setStorage } from "./storage";
import { differenceInMinutes } from "date-fns";
import { logger } from "./logger";

import {
    WEATHER_FETCH_INTERVAL,
    WEATHER_UNITS,
    WEATHER_API_URL,
} from "Constants";

type QueryParams = {
    q?: any;
    lat?: string | number;
    long?: string | number;
};

// Enter your Open Weather API key in the .env file
const KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

if (!KEY) {
    console.error(
        "Please add your OpenWeatherMap API Key (https://home.openweathermap.org/api_keys) to the .env file"
    );
}

const shouldUseWeatherCache = async () => {
    const timestamp = (await getStorage(KEYS.WEATHER_DATA_FETCH_TIMESTAMP)) as
        | number
        | undefined;

    if (!timestamp) {
        logger.log(`Weather data hasn't been fetched yet`);
        return false;
    }

    // If the time since last fetch has been longer than the fetch interval, don't use cache.
    const minutesSinceLastFetch = differenceInMinutes(
        new Date(),
        new Date(timestamp)
    );

    if (Math.abs(minutesSinceLastFetch) >= WEATHER_FETCH_INTERVAL) {
        logger.log(
            `Weather data was last fetched ${minutesSinceLastFetch} minutes ago`
        );
        return false;
    }

    logger.log(
        `Weather data was last fetched ${minutesSinceLastFetch} minutes ago`
    );
    return true;
};

const getCachedWeather = async () => {
    return (await getStorage(KEYS.WEATHER_DATA)) as Weather;
};

export const getWeather = async (query: QueryParams) => {
    if (await shouldUseWeatherCache()) {
        logger.log("Using cached weather data");
        return getCachedWeather();
    }

    logger.log("Fetching weather data");

    const params = qs.stringify({
        appId: KEY,
        units: WEATHER_UNITS,
        ...query,
    });

    try {
        const response = await fetch(WEATHER_API_URL + params);
        const weatherData = (await response.json()) as Weather;

        if (response.status === 401) {
            throw weatherData;
        }

        await setStorage(KEYS.WEATHER_DATA, weatherData);
        await setStorage(KEYS.WEATHER_DATA_FETCH_TIMESTAMP, Date.now());

        return weatherData;
    } catch (e) {
        console.error(e);
        return null;
    }
};
