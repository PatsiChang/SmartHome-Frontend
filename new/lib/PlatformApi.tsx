import { Platform } from "react-native";

const PLATFORM_IOS = "ios";
const PLATFORM_ANDROID = "android";
const PLATFORM_MACOS = "macos";
const PLATFORM_WINDOWS = "windows";
const PLATFORM_WEB = "web";

const getCurrentPlatform = () : "ios" | "android" | "macos" | "windows" | "web" => {
    return Platform.OS;
}

export default { PLATFORM_IOS, PLATFORM_ANDROID, PLATFORM_MACOS, PLATFORM_WINDOWS, PLATFORM_WEB, getCurrentPlatform };
