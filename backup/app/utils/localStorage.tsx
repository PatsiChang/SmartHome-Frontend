export const setToLocalStorage = (key: string, value: any) => {
    if (typeof value !== "string") {
        window.localStorage.setItem(key, JSON.stringify(value));
    } else {
        window.localStorage.setItem(key, value);
    }
}

export const getLocalStorage = (key: string) => {
    return window.localStorage.getItem(key);
}