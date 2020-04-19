import slugsFile from "../files/place_slugs_v3.json";
import { getStorage, setStorage, KEYS } from "./storage";

export const BASE_URL = "http://www.atlasobscura.com";

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

const getSlugs = () => {
    return slugsFile.slugs;
};

const getImageUrl = (url: string): string => {
    if (url.match(/^\/browser_tab/)) {
        return BASE_URL + url;
    }

    return url;
};

export type Place = {
    id: number;
    title: string;
    subtitle: string;
    city: string;
    state: string;
    country: string;
    location: string;
    url: string;
    destination_url: string;
    image_url_v2: string;
    image_attribution: string;
    background_image_url: string;
};

export const getPlaceData = async () => {
    const slugs = getSlugs();
    const index = await getCurrentIndex();

    const slug = slugs[index % slugs.length];
    const response = await fetch(BASE_URL + slug);

    const body: Place = await response.json();

    await incrementIndex();

    // Return object with imageUrl.
    return {
        ...body,
        background_image_url: getImageUrl(body.image_url_v2),
    };
};
