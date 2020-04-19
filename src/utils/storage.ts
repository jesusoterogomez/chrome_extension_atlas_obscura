/**
 * Wrapper for reading and storing values from chrome.storage.local
 */

export enum KEYS {
    CURRENT_INDEX = "CURRENT_INDEX",
}

export const setStorage = (key: KEYS, value: any) => {
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
