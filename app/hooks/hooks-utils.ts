export type Action = "POST" | "GET" | "PUT" | "DELETE";

export const getRequestConfig = (action: Action) => <T>(user: T) => {
    switch (action) {
        case "POST": {
            return {
                body: JSON.stringify(user)
            }
        }
        case "GET": {
            return {}
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

    // const getResponseConfig = (fetchInput: Parameters<typeof fetch>[0]) => async (response: any) => {
    //     switch (fetchInput) {
    //         case `${process.env.NEXT_PUBLIC_API_URL1} + /login`: {
    //             const loginResponse = await response.text();
    //             setToLocalStorage("token", loginResponse);
    //         }
    //         case `${process.env.NEXT_PUBLIC_API_URL1} + /recipe/getMyRecipe`: {
    //             const recipeList = response.json();
    //             const data = recipeList as ReceipeData[];
    //             console.log("useData test", data)
    //             setRecipeList(data);
    //             return data;
    //         }
    //     }
    // }