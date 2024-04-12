
const globalContext: { [key: string]: any } = {
    defaultContext: "",
};

export const getContext = (key: string) => {
    return globalContext[key];
}
export const setContext = <T>(key: string, value: T) => {
    return globalContext[key] = value;
}