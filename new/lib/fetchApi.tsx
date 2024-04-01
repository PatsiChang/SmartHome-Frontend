import * as UserSessionApi from './userSessionApi';

export type Action = "POST" | "GET" | "PUT" | "DELETE";

export async function doFetch<T>(url: Parameters<typeof fetch>[0], method: Action, data?: T) {

    if (method !== "GET" && (data === null || data === undefined)) {
        throw new Error("body is missing. Fail to fetch.");
    }
    UserSessionApi.hasLoggedIn();
    // Todo: Set token to authorization header if logged in
    const token = UserSessionApi.getSessionToken();
    let request: RequestInit = {
        method,
        headers: {
            // "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    };
    if (method !== "GET") {
        request.body = JSON.stringify(data);
    }
    const response = await fetch(url, request);
    if (response.ok) {
        if (response.headers.get("content-length") != null && response.headers.get("content-length") != "0") {
            if (response.headers.get("content-type")?.includes("text/plain")) {
                return await response.text();
            } else {
                return await response.json();
            }
        }
    } else {
        throw new Error("Failed to fetch data. HTTP status: " + response.status);
    }
}



