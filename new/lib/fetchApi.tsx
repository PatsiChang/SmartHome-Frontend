import * as UserSessionApi from './userSessionApi';
import {convertBase64ToBlob} from "@/lib/Base64Util";

export type Action = "POST" | "GET" | "PUT" | "DELETE";

export type HeaderContentType = "json" | "file" | "text"

export interface UploadFileOption {
    encodeAsBase64 ?: boolean,
    formDataName ?: string
    method ?: Action
}

function getHeaderContentType(contentType : HeaderContentType) {
    switch (contentType) {
        case "json" : return "application/json";
        // case "file" : return "multipart/form-data";
        default : return "text/plain";
    }
}

function buildRequestHeader(contentType ?: HeaderContentType): HeadersInit {
    return {
        ...contentType && contentType != "file" ? {"Content-Type": getHeaderContentType(contentType)} : {},
        ...UserSessionApi.hasLoggedIn() ? {"Authorization": `Bearer ${UserSessionApi.getSessionToken()}`} : {}
    };
}

async function genericFetch<T>(url: Parameters<typeof fetch>[0], request: RequestInit) {
    const response = await fetch(url, request);
    if (response.ok) {
        if (response.headers.get("content-type")?.includes("application/json")) {
            return await response.json() as T;
        } else if (response.headers.get("content-type")?.includes("text/plain")) {
            return await response.text();
        } else {
            throw new Error("Unknown response content-type  " + response.headers.get("content-type"));
        }
    } else {
        throw new Error("Failed to fetch data. HTTP status: " + response.status);
    }
}

export async function doFetch<T>(url: Parameters<typeof fetch>[0], method: Action, data?: any) {

    if (method !== "GET" && (data === null || data === undefined)) {
        throw new Error("body is missing. Fail to fetch.");
    }
    let request: RequestInit = {
        method,
        headers: buildRequestHeader(typeof data === "object" ? "json" : undefined)
    };
    if (method !== "GET") {
        if (typeof data !== "string") { request.body = JSON.stringify(data) }
        else { request.body = data }
    }
    return await genericFetch<T>(url, request);
}

function buildFileUploadFormData(fileData : Blob | string | File, formDataName : string = "file") {
    const formData = new FormData();
    formData.append(formDataName, fileData);
    return formData;
}

type UploadFile = Blob | string;

export async function uploadFile(url: Parameters<typeof fetch>[0], fileData : UploadFile, uploadFileOption : UploadFileOption = {}) {
    if (uploadFileOption.encodeAsBase64) {
        throw new Error("encodeAsBase64 not supported in current version");
    }

    const request: RequestInit = {
        method: (uploadFileOption.method) ? uploadFileOption.method : "POST",
        headers: buildRequestHeader((uploadFileOption.encodeAsBase64) ? "text" : "file"),
        body: buildFileUploadFormData(fileData, uploadFileOption.formDataName)
    };

    const fileId = await genericFetch(url, request);
    if(typeof fileId !== 'string') {
        throw new Error("Fail to get the id of the uploaded file.")
    }

    return fileId;
}
