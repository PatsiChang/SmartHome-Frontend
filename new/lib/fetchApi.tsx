import * as UserSessionApi from './userSessionApi';

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";

export async function doFetch<T extends object | string>(method : "GET" | "POST" | "PUT" | "DELETE", url : string, data ?: any) {
    if (method !== GET && typeof data === 'undefined') {
        throw new Error("body is missing. Fail to fetch.");
    }

    UserSessionApi.hasLoggedIn();
    // TODO set token to authorization header if logged in


    // TODO fetch
    let resp = await fetch(url);

    let contentType = resp.headers.get("content-type");
    if (contentType != null && contentType.includes("text/plain")){
        return await resp.text() as T;
    } else {
        return await resp.json() as T;
    }
}
