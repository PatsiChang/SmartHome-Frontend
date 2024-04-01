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
    // TODO mocking login
    console.log("sending to loginWithUidAndPassword: " + uid + " | " + password);
    await new Promise((r) => setTimeout(r, 1000));
    if (uid == "test" && password == "test") {
        sessionToken = "123-123-123";
    } else {
        throw new Error("INVALID");
    }

    window.localStorage.setItem("sessionToken", sessionToken);
    return sessionToken;
}

export async function logOut() {
    // TODO
    sessionToken = "";
    window.localStorage.removeItem("sessionToken");
}

export function hasLoggedIn() {
    return typeof sessionToken !== null && sessionToken.trim().length > 0;
}

export function getSessionToken() {
    return sessionToken;
}

export async function getUserProfile() {
    // TODO mock
    await new Promise((r) => setTimeout(r, 1000));
    return (sessionToken === "123-123-123") ? {
        userName: "Test user"
    } :  {
        userName: "Error!!!!!"
    };
}