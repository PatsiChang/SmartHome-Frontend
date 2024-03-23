import { useState } from 'react';
import { getRequestConfig } from './hooks-utils';
import { getLocalStorage, setToLocalStorage } from '../utils/localStorage';
import { ReceipeData } from '../types/recipeTypes';
import { SocialMediaUser } from '../types/socialMediaTypes';

type SuccessResponse<T> = { data: T; };
type FailedResponse = { error: string; }
export type Action = "POST" | "GET" | "PUT" | "DELETE";

const useData = () => {

    const [recipeList, setRecipeList] = useState<Array<ReceipeData>>([]);
    // const [currentRandomRecipe, setCurrentRandomRecipe] = useState<ReceipeData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [socialMediaUser, setSocialMediaUser] = useState<SocialMediaUser>();

    const fetchData = (fetchInput: Parameters<typeof fetch>[0]) => (action: Action) =>
        async <T>(input: T) => {
            const token = getLocalStorage("token");
            try {
                setIsLoading(true);
                const response = await fetch(fetchInput, {
                    method: action,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    ...getRequestConfig(action)(input)
                });
                if (fetchInput == process.env.NEXT_PUBLIC_API_URL + "/recipe/getMyRecipe") {
                    const recipeListByToken = await response.json();
                    if ("error" in recipeListByToken) {
                        throw Error(recipeListByToken.error);
                    }
                    const data = recipeListByToken as ReceipeData[];
                    setRecipeList(data);
                } else if (fetchInput == process.env.NEXT_PUBLIC_API_URL1 + "/login") {
                    const loginResponse = await response.text();
                    if (loginResponse.includes("error")) {
                        throw new Error(loginResponse);
                    }
                    setToLocalStorage("token", loginResponse);
                    return loginResponse;
                } else if (fetchInput == process.env.NEXT_PUBLIC_API_URL + "/socialMedia/getUserByToken") {
                    const smUserResponse: SocialMediaUser = await response.json();
                    if (typeof smUserResponse === 'object' && smUserResponse !== undefined) {
                        setSocialMediaUser(smUserResponse);
                        console.log("setSocialMediaUser in hook", socialMediaUser)
                        return socialMediaUser;
                    }
                } else if (process.env.NEXT_PUBLIC_API_URL + "/socialMedia") {
                    const smUserResponse: SocialMediaUser = await response.json();
                    setSocialMediaUser(smUserResponse);
                }
                // getResponseConfig(fetchInput)(response);
            } catch (error) {
                console.log("error: ", error)
                return null;
            } finally {
                console.log("finally: ")
                setIsLoading(false);
            }
        }

    const postRecipeData = fetchData(process.env.NEXT_PUBLIC_API_URL + "/recipe")("POST");
    const getRecipeData = fetchData(process.env.NEXT_PUBLIC_API_URL + "/recipe/getMyRecipe")("GET");
    //   const getRandomRecipe = fetchData(process.env.NEXT_PUBLIC_API_URL + "/recipe/getRandomRecipe")("GET");
    //   const updateRecipeIcon = fetchData(process.env.NEXT_PUBLIC_API_URL + "/recipe")("PUT");
    const deleteRecipeData = fetchData(process.env.NEXT_PUBLIC_API_URL + "/recipe")("DELETE");
    const postLoginData = fetchData(process.env.NEXT_PUBLIC_API_URL1 + "/login")("POST");
    const postSocialMediaData = fetchData(process.env.NEXT_PUBLIC_API_URL + "/socialMedia")("POST");
    const getSocialMediaData = fetchData(process.env.NEXT_PUBLIC_API_URL + "/socialMedia/getUserByToken")("GET")

    return {
        postRecipeData, getRecipeData, postLoginData, recipeList, deleteRecipeData,
        postSocialMediaData, getSocialMediaData, socialMediaUser, setSocialMediaUser
    }

}

export default useData;
