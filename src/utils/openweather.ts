import qs from "qs";
import { Weather } from "Types";

type QueryParams = {
    q?: any;
    lat?: string | number;
    long?: string | number;
};

// Add REACT_APP_OPEN_WEATHER_API_KEY has to exist in .env.local file.
// The .env.local file is gitignored must be generated during CI executions
const KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const getWeather = async (query: QueryParams) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?";

    const params = qs.stringify({
        appId: KEY,
        units: "metric",
        ...query,
    });

    const response = await fetch(url + params);
    const weatherData = (await response.json()) as Weather;

    return weatherData;
};
