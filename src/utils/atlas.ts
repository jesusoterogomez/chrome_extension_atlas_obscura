import { BASE_URL, PLACES_FETCH_INTERVAL, PLACES_LIST_URL } from "Constants";
import { Place, PlacesJSONContent } from "Types";
import { getStorage, setStorage, KEYS } from "utils/storage";
import { differenceInHours } from "date-fns";
import localSlugsFile from "files/slugs.json";

// Sets initial image index in chrome storage.
const initIndex = async () => {
    await setStorage(KEYS.CURRENT_INDEX, 0);
};

// Gets current index from chrome storage.
const getCurrentIndex = async (): Promise<number> => {
    const index = (await getStorage(KEYS.CURRENT_INDEX)) as number | undefined;

    if (typeof index === "undefined") {
        await initIndex();
        return 0;
    }

    return index;
};

const incrementIndex = async () => {
    const index = await getCurrentIndex();
    await setStorage(KEYS.CURRENT_INDEX, index + 1);
};

const getSlugs = async () => {
    const timestamp = (await getStorage(KEYS.PLACES_LIST_FETCH_TIMESTAMP)) as
        | number
        | undefined;

    // If there hasn't been any fetched JSON content, fetch it and store the timestamp
    if (!timestamp) {
        return await fetchSlugs();
    }

    // If the time since last fetch has been longer than the fetch interval.
    // fetch slugs json again.
    const hoursSinceLastFetch = differenceInHours(
        new Date(),
        new Date(timestamp)
    );

    if (Math.abs(hoursSinceLastFetch) >= PLACES_FETCH_INTERVAL) {
        return await fetchSlugs();
    }

    // If the cached slugs are still valid, fetch from chrome storage.
    return await getCachedSlugs();
};

/**
 * Depending on the URL returned from atlas obscura's API
 * the image either has the full URL or needs to be prepended with the Base URL
 * This function ensures we return a valid URL every time.
 * @param url
 */
const getImageUrl = (url: string): string => {
    if (url.match(/^\/browser_tab/)) {
        return BASE_URL + url;
    }

    return url;
};

const fetchSlugs = async () => {
    try {
        const response = await fetch(PLACES_LIST_URL);
        const places: PlacesJSONContent = await response.json();

        // Store time when the list was fetched.
        await setStorage(KEYS.PLACES_LIST_FETCH_TIMESTAMP, Date.now());

        // Store list of places
        await setStorage(KEYS.PLACES_LIST, places.slugs);

        // @todo: Reenable if it's proven that every new day, the array order completely changes. Otherwise resetting the index might make the users see the same images at the start of every day.
        // await initIndex(); // Reset index when fetching new slugs

        return places.slugs;
    } catch (e) {
        return localSlugsFile.slugs;
    }
};

const getCachedSlugs = async (): Promise<PlacesJSONContent["slugs"]> => {
    const places = (await getStorage(KEYS.PLACES_LIST)) as
        | PlacesJSONContent["slugs"]
        | undefined;

    // Default to local slugs if places list is empty.
    if (!places) {
        return localSlugsFile.slugs;
    }

    return places;
};

export const getPlaceData = async () => {
    const slugs = await getSlugs();
    const index = await getCurrentIndex();
    const { slug } = slugs[index % slugs.length];

    const response = await fetch(BASE_URL + slug);
    const body: Place = await response.json();

    await incrementIndex();

    // Return object with imageUrl.
    return {
        ...body,
        background_image_url: getImageUrl(body.image_url_v2),
    };
};
