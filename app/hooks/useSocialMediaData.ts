"use strict"
import { useState } from "react";
import { AccountStatus, AccountType, RecipeCategories } from "../Enum/enum";
import { ReceipeData } from "./useRecipeData"

export interface SocialMediaUser {
    uid: string,
    userName: string,
    userNameChangeCount: number,
    displayName: string,
    email: string,
    profilePicture: string,
    bannerPicture: string,
    accountStatus: AccountStatus,
    accountType: AccountType,
    biography: string,
    followersCount: number,
    followingCount: number,
    displayedRecipes: Array<ReceipeData>,
    showcasedRecipes: Array<ReceipeData>,
    savedRecipes: Array<ReceipeData>,
    userInterest: Array<RecipeCategories>,
}
type SuccessResponse<T> = { data: T; };
type FailedResponse = { error: string; }
//Get One User
type SocialMediaUserSuccessResponse = SuccessResponse<SocialMediaUser>;
//Get all Users
type SocialMediaUsersSuccessResponse = SuccessResponse<SocialMediaUser[]>;
type SocialMediaUserResponse = SocialMediaUserSuccessResponse
    | SocialMediaUsersSuccessResponse | FailedResponse;
type Action = "POST" | "GET" | "PUT" | "DELETE";
type SocialMediaHookProps = {
    userName?: string,
    user?: SocialMediaUser,
}

const getRequestConfig = (action: Action) => <T>(user: T) => {
    switch (action) {
        case "POST": {
            return {
                body: JSON.stringify(user)
            }
        }
        case "GET": {
            return {
                body: JSON.stringify(user)
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

// Convert the format of the data received from the server to frontend
// const convertDataDTOToUser = (user: SocialMediaUser) => {
    // return user.map(user => ({ id: duty.id, name: duty.name }));
// };

const useSocialMediaData = ({userName, user} : SocialMediaHookProps = {}) => {
    const [allSocialMediaUsers, setAllSocialMediaUsers] = useState<SocialMediaUser[]>();
    const [socialMediaUser, setSocialMediaUser] = useState<SocialMediaUser>();
    const [isLoading, setIsLoading] = useState<boolean>(true);


    const fetchData = (fetchInput: Parameters<typeof fetch>[0]) => (action: Action) => async <T>(input: T) => {
        try {
            setIsLoading(true);
            console.log("Inside Fetch Data:",input)
            const response = await fetch(fetchInput, {
                method: action,
                headers: {
                    "Content-Type": "application/json"
                },
                ...getRequestConfig(action)(input)
            });
            const socialMediaUserResponse: SocialMediaUserResponse = await response.json();
            if ("error" in socialMediaUserResponse) {
                throw Error(socialMediaUserResponse.error);
            }
            const data = socialMediaUserResponse.data || [];
            if (Array.isArray(data)) {
                setAllSocialMediaUsers(data);
                return allSocialMediaUsers;
            } else if (typeof data === 'object' && data !== undefined) {
                setSocialMediaUser(data);
                return socialMediaUser;
            }
        } catch (error) {
            return null;
        } finally {
            setIsLoading(false);
        }
    }
    const postData = fetchData(process.env.NEXT_PUBLIC_API_URL + "/socialMedia")("POST");
    const getData = fetchData(process.env.NEXT_PUBLIC_API_URL + "/socialMedia")("GET")
    return { postData, getData, fetchData, socialMediaUser, allSocialMediaUsers, isLoading }

}
export default useSocialMediaData;