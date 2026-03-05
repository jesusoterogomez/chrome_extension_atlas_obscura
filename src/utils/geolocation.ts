export const PERMISSION_DENIED = 1;

export const isPermissionDenied = (error: unknown): boolean => {
    if (typeof error === "object" && error !== null && "code" in error) {
        return (error as { code: number }).code === PERMISSION_DENIED;
    }
    return false;
};

/**
 * Queries the browser for the current geolocation permission state.
 * Returns "granted", "denied", or "prompt". Returns null if the
 * Permissions API is unavailable.
 */
export const queryPermission = async (): Promise<PermissionState | null> => {
    try {
        const result = await navigator.permissions.query({
            name: "geolocation",
        });
        return result.state;
    } catch {
        return null;
    }
};

export const getPosition = async (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation unavailable"));
            return;
        }

        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};
