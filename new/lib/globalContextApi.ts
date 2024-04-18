
const globalContext: { [key: string]: any } = {
    defaultContext: "",
};

export const getContext = <T>(key: string) => {
    return globalContext[key] as T;
}
export const setContext = <T>(key: string, value: T) => {
    return globalContext[key] = value;
}