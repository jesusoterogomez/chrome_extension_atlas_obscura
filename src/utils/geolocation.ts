export const getPosition = async (): Promise<Position> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation.getCurrentPosition) {
            reject("Geolocation unavailable");
        }

        navigator.geolocation.getCurrentPosition((result) => {
            return resolve(result);
        });
    });
};
