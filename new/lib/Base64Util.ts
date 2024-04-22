export function convertBase64ToBlob(base64Data : string) {
    return new Blob([new Uint8Array( [...atob(base64Data)].map(char => char.charCodeAt(0)))]);
}


export async function convertBase64UriToBlob(base64Uri : string) {
    return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", base64Uri, true);
        xhr.send(null);
    }) as Blob;
}
