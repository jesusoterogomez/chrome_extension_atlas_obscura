/**
 * Wrapper for reading and storing values from chrome.storage.local
 */

export enum KEYS {
    /**
     * Index of viewed images in the JSON list of images
     */
    CURRENT_INDEX = "CURRENT_INDEX",
    /**
     * List of places in JSON format
     */
    PLACES_LIST = "PLACES_LIST",
    /**
     * Timestamp of when the list of places was last fetched
     */
    PLACES_LIST_FETCH_TIMESTAMP = "PLACES_LIST_FETCH_TIMESTAMP",
    /**
     * Cached weather data
     */
    WEATHER_DATA = "WEATHER_DATA",
    /**
     * Weather data fetch timestamp
     */
    WEATHER_DATA_FETCH_TIMESTAMP = "WEATHER_DATA_FETCH_TIMESTAMP",
}

export const setStorage = (key: KEYS, value: any) => {
    if (!chrome.storage) {
        return localStorage.setItem(key, JSON.stringify(value));
    }

    return new Promise((resolve) => {
        chrome.storage.local.set(
            {
                [key]: value,
            },
            () => {
                resolve(true);
            }
        );
    });
};

export const getStorage = (key: KEYS) => {
    if (!chrome.storage) {
        const data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }

        return undefined;
    }

    return new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
            if (key in result) {
                resolve(result[key]);
            } else {
                resolve(undefined);
            }
        });
    });
};
