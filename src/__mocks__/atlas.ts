import { Place } from "Types";

const place: Place = {
    id: 12949,
    title: "Power Plant IM",
    subtitle:
        "The vast chamber inside this abandoned cooling tower looks like something out of a sci-fi dystopia.",
    city: "Charleroi",
    state: "Walloon Region",
    country: "Belgium",
    location: "Charleroi, Belgium",
    url: "https://www.atlasobscura.com/places/power-plant-im",
    image_url_v2: "",
    // image_url: "https://images.atlasobscura.com/browser_tab_images/2019/09/23/19/09/33/3e97eb03-1cbc-4c39-bcf9-b2b302a74d9a/browser_tab_image.jpg",
    background_image_url: "/mocks/browser_tab_image_mock.jpg",
    image_attribution:
        '\u003cspan class="caption-credit"\u003e\u003ca target="_blank" href="http://www.flickr.com/photos/lennartt/8501963784"\u003eLennart Tange\u003c/a\u003e (Creative Commons)\u003c/span\u003e',
    destination_url: "https://www.atlasobscura.com/things-to-do/belgium",
};

export const getPlaceData = async (): Promise<Place> => {
    return new Promise((resolve) => {
        resolve(place);
    });
};
