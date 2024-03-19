
export type Action = "POST" | "GET" | "PUT" | "DELETE";


export const getRequestConfig = (action: Action) => <T>(user: T) => {
    switch (action) {
        case "POST": {
            return {
                body: JSON.stringify(user)
            }
        }
        case "GET": {
            return {

            }
        }
        case "PUT": {
            return {
                body: JSON.stringify(user)
            }
        }
        case "DELETE": {
            return {
                body: JSON.stringify(user)
            }
        }
        default:
            throw Error(`Unsupport method : ${action}`)
    }
}