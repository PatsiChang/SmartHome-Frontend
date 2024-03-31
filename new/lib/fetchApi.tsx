import * as UserSessionApi from './userSessionApi';

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";

export async function doFetch(method : "GET" | "POST" | "PUT" | "DELETE", url : string, data ?: any) {
    if (method !== GET && typeof data === 'undefined') {
        throw new Error("body is missing. Fail to fetch.");
    }

    UserSessionApi.hasLoggedIn();
    // TODO set token to authorization header if logged in

    // TODO fetch
}
