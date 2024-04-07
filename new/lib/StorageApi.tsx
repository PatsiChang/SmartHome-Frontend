import PlatformApi from "@/lib/PlatformApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key: string, value: any) => {
    switch (PlatformApi.getCurrentPlatform()) {
        case PlatformApi.PLATFORM_WEB :
            window.localStorage.setItem(key, JSON.stringify(value));
            break;
        case PlatformApi.PLATFORM_IOS :
        case PlatformApi.PLATFORM_ANDROID :
            await AsyncStorage.setItem(key, JSON.stringify(value));
            break;
        default :
            throw new Error("storage function is not supported in current platform");
    }
}

const getData = async (key: string) => {
    let data;
    switch (PlatformApi.getCurrentPlatform()) {
        case PlatformApi.PLATFORM_WEB :
            data = window.localStorage.getItem(key)
            break;
        case PlatformApi.PLATFORM_IOS :
        case PlatformApi.PLATFORM_ANDROID :
            data = await AsyncStorage.getItem(key);
            break;
        default :
            throw new Error("storage function is not supported in current platform");
    }

    return data != null ? JSON.parse(data) : null;
}

const deleteData = async (key: string) => {
    switch (PlatformApi.getCurrentPlatform()) {
        case PlatformApi.PLATFORM_WEB :
            window.localStorage.removeItem(key);
            break;
        case PlatformApi.PLATFORM_IOS :
        case PlatformApi.PLATFORM_ANDROID :
            await AsyncStorage.removeItem(key);
            break;
        default :
            throw new Error("storage function is not supported in current platform");
    }
}

export default { storeData, getData, deleteData };