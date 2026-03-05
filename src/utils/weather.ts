import { Weather } from "Types";
import { getStorage, KEYS, setStorage } from "./storage";
import { differenceInMinutes } from "date-fns";
import { logger } from "./logger";
import { WEATHER_FETCH_INTERVAL, WEATHER_API_URL } from "Constants";

type OpenMeteoResponse = {
    current: {
        temperature_2m: number;
        weather_code: number;
        is_day: number;
    };
};

type WeatherQuery = {
    lat: number;
    lon: number;
};

const WMO_DESCRIPTIONS: Record<number, string> = {
    0: "clear sky",
    1: "mainly clear",
    2: "partly cloudy",
    3: "overcast",
    45: "fog",
    48: "depositing rime fog",
    51: "light drizzle",
    53: "moderate drizzle",
    55: "dense drizzle",
    56: "light freezing drizzle",
    57: "dense freezing drizzle",
    61: "slight rain",
    63: "moderate rain",
    65: "heavy rain",
    66: "light freezing rain",
    67: "heavy freezing rain",
    71: "slight snow fall",
    73: "moderate snow fall",
    75: "heavy snow fall",
    77: "snow grains",
    80: "slight rain showers",
    81: "moderate rain showers",
    82: "violent rain showers",
    85: "slight snow showers",
    86: "heavy snow showers",
    95: "thunderstorm",
    96: "thunderstorm with slight hail",
    99: "thunderstorm with heavy hail",
};

/**
 * Maps WMO weather codes to the OpenWeatherMap icon base codes
 * so the existing SVG icon set can be reused.
 */
const WMO_ICON_MAP: Record<number, string> = {
    0: "01",
    1: "02",
    2: "03",
    3: "04",
    45: "50",
    48: "50",
    51: "09",
    53: "09",
    55: "09",
    56: "09",
    57: "09",
    61: "10",
    63: "10",
    65: "10",
    66: "10",
    67: "10",
    71: "13",
    73: "13",
    75: "13",
    77: "13",
    80: "09",
    81: "09",
    82: "09",
    85: "13",
    86: "13",
    95: "11",
    96: "11",
    99: "11",
};

const getIconCode = (weatherCode: number, isDay: boolean): string => {
    const base = WMO_ICON_MAP[weatherCode] ?? "01";
    return base + (isDay ? "d" : "n");
};

const parseResponse = (data: OpenMeteoResponse): Weather => {
    const { temperature_2m, weather_code, is_day } = data.current;

    return {
        temperature: temperature_2m,
        description: WMO_DESCRIPTIONS[weather_code] ?? "unknown",
        icon: getIconCode(weather_code, is_day === 1),
    };
};

const shouldUseCache = async () => {
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

export const getWeather = async (
    query: WeatherQuery
): Promise<Weather | null> => {
    if (await shouldUseCache()) {
        logger.log("Using cached weather data");
        return getCachedWeather();
    }

    logger.log("Fetching weather data");

    const url = new URL(WEATHER_API_URL);
    url.searchParams.set("latitude", String(query.lat));
    url.searchParams.set("longitude", String(query.lon));
    url.searchParams.set("current", "temperature_2m,weather_code,is_day");
    url.searchParams.set("temperature_unit", "celsius");

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data: OpenMeteoResponse = await response.json();
        const weather = parseResponse(data);

        await setStorage(KEYS.WEATHER_DATA, weather);
        await setStorage(KEYS.WEATHER_DATA_FETCH_TIMESTAMP, Date.now());

        logger.log("Weather data fetched");

        return weather;
    } catch (e) {
        console.error(e);
        return null;
    }
};
