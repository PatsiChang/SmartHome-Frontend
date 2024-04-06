import { UserLogin, isPerson } from "@/model/userProfile";
import { doFetch } from "./fetchApi";

const SESSION_TOKEN_STORAGE_KEY = "sessionToken";
let sessionToken = '';
recoverToken();

function recoverToken() {
    if (typeof window !== "undefined") {
        if (sessionToken === null || sessionToken.trim().length === 0) {
            let tokenStored = window.localStorage.getItem(SESSION_TOKEN_STORAGE_KEY);
            if (tokenStored !== null) {
                console.log("recover token from local storage: " + tokenStored);
                sessionToken = tokenStored;
            }
        }
    }
}

export async function loginWithUidAndPassword(uid: string, password: string): Promise<string> {
    console.log("sending to loginWithUidAndPassword: " + uid + " | " + password);
    // await new Promise((r) => setTimeout(r, 1000));
    const person: UserLogin = {
        userId: uid,
        logInPasswordHashed: password,
    }
    const response = await doFetch("http://localhost:8081/login", "POST", person);
    if (typeof response == "string") {
        sessionToken = response;
    } else {
        throw new Error("INVALID token");
    }
    window.localStorage.setItem("sessionToken", sessionToken);
    return sessionToken;
}

export async function logOut() {
    // TODO: Need server implementation RECIPE-93
    await doFetch("http://localhost:8081/login/logout", "POST", getSessionToken());
    window.localStorage.removeItem("sessionToken");
    sessionToken = "";
}

export function hasLoggedIn() {
    return typeof sessionToken !== null && sessionToken.trim().length > 0;
}

export function getSessionToken() {
    return sessionToken;
}

export async function getUserProfile() {
    // await new Promise((r) => setTimeout(r, 1000));
    const response = await doFetch("http://localhost:8081/logInSession", "GET");
    if (isPerson(response)) {
        return response;
    } else throw new Error("Error in get User")
}