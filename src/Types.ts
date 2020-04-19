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
