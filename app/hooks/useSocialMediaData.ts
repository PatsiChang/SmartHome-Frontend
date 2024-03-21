"use strict"
import { useState } from "react";
import { Action, getRequestConfig } from "./hooks-utils";
import { ReceipeData, RecipeCategories } from "../types/recipeTypes";
import { AccountStatus, AccountType, SocialMediaUser } from "../types/socialMediaTypes";


type SuccessResponse<T> = { data: T; };
type FailedResponse = { error: string; }
//Get One User
// type SocialMediaUserSuccessResponse = SuccessResponse<SocialMediaUser>;
//Get all Users
// type SocialMediaUsersSuccessResponse = SuccessResponse<SocialMediaUser[]>;
// type SocialMediaUserResponse = SocialMediaUserSuccessResponse
//     | SocialMediaUsersSuccessResponse | FailedResponse;
// type SocialMediaHookProps = {
//     userName?: string,
//     user?: SocialMediaUser,
// }

// Convert the format of the data received from the server to frontend
// const convertDataDTOToUser = (user: SocialMediaUser) => {
// return user.map(user => ({ id: duty.id, name: duty.name }));
// };

const useSocialMediaData = () => {
    // const [allSocialMediaUsers, setAllSocialMediaUsers] = useState<SocialMediaUser[]>();
    const [socialMediaUser, setSocialMediaUser] = useState<SocialMediaUser>();
    const [isLoading, setIsLoading] = useState<boolean>(true);


    const fetchData = (fetchInput: Parameters<typeof fetch>[0]) => (action: Action) => (token: string) =>
        async <T>(input: T) => {
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
                const socialMediaUserResponse: SocialMediaUser = await response.json();
                if (typeof socialMediaUserResponse === 'object' && socialMediaUserResponse !== undefined) {
                    setSocialMediaUser(socialMediaUserResponse);
                    return socialMediaUser;
                }
            } catch (error) {
                return null;
            } finally {
                setIsLoading(false);
            }
        }

    const postData = fetchData(process.env.NEXT_PUBLIC_API_URL + "/socialMedia")("POST");
    const getSocialMediaUser = fetchData(process.env.NEXT_PUBLIC_API_URL + "/socialMedia/getUserByToken")("GET")
    return { postData, getSocialMediaUser, socialMediaUser, setSocialMediaUser, isLoading }
}
export default useSocialMediaData;