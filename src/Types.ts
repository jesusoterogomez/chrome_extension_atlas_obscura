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

export type PlacesJSONContent = {
    slugs: {
        slug: string;
        upvotes?: number;
    }[];
};

export type Weather = {
    coord: { lon: number; lat: number };
    weather: [{ id: number; main: string; description: string; icon: string }];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: { speed: number; deg: number };
    clouds: { all: number };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
};
