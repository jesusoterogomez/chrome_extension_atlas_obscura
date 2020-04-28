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

// Add REACT_APP_OPEN_WEATHER_API_KEY has to exist in .env.local file.
// The .env.local file is gitignored must be generated during CI executions
const KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const shouldUseWeatherCache = async () => {
    const timestamp = (await getStorage(KEYS.WEATHER_DATA_FETCH_TIMESTAMP)) as
        | number
        | undefined;

    if (!timestamp) {
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

    const response = await fetch(WEATHER_API_URL + params);
    const weatherData = (await response.json()) as Weather;

    await setStorage(KEYS.WEATHER_DATA, weatherData);
    await setStorage(KEYS.WEATHER_DATA_FETCH_TIMESTAMP, Date.now());

    return weatherData;
};
