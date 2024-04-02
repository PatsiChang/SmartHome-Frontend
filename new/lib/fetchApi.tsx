import * as UserSessionApi from './userSessionApi';

export type Action = "POST" | "GET" | "PUT" | "DELETE";

export async function doFetch<T>(url: Parameters<typeof fetch>[0], method: Action, data?: any) {

    if (method !== "GET" && (data === null || data === undefined)) {
        throw new Error("body is missing. Fail to fetch.");
    }
    let request: RequestInit = {
        method,
        headers: {
            ...(typeof data == "object" ? {
                "Content-Type": "application/json",
            } : {}),
            ...(UserSessionApi.hasLoggedIn() ? {
                "Authorization": `Bearer ${UserSessionApi.getSessionToken()}`
            } : {})
        }
    };
    if (method !== "GET") {
        if (typeof data !== "string") { request.body = JSON.stringify(data) }
        else { request.body = data }
    }
    const response = await fetch(url, request);
    if (response.ok) {
        // response.headers.get("content-length") != null && response.headers.get("content-length") != "0"
        if (response.headers.get("content-type")?.includes("application/json")) {
            return await response.json() as T;
        } else if (response.headers.get("content-type")?.includes("text/plain")) {
            return await response.text();
        }
    } else {
        throw new Error("Failed to fetch data. HTTP status: " + response.status);
    }
}



