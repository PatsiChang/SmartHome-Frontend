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
    BannerPicture: string,
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
type Action = "GET" | "PUT" | "DELETE";

const getRequestConfig = (action: Action) => <T>(input: T) => {
    switch (action) {
        case "GET": {
            return {
            }
        }
        case "PUT": {
            return {
                body: JSON.stringify({ input })
            }
        }
        case "DELETE": {
            return {
                body: JSON.stringify({ input })
            }
        }
        default:
            throw Error(`Unsupport method : ${action}`)
    }
}

// Convert the format of the data received from the server to frontend
const convertDataDTOToUser = (user: SocialMediaUser) => {
    // return user.map(user => ({ id: duty.id, name: duty.name }));
};

const useSocialMediaData = () => {
    const [allSocialMediaUsers, setAllSocialMediaUsers] = useState<SocialMediaUser[]>();
    const [socialMediaUser, setSocialMediaUser] = useState<SocialMediaUser>();
    const [isLoading, setIsLoading] = useState<boolean>(true);


    const fetchData = (fetchInput: Parameters<typeof fetch>[0]) => (action: Action) => async <T>(input: T) => {
        try {
            setIsLoading(true);
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
        return { socialMediaUser, allSocialMediaUsers, isLoading }
    }
}
export default useSocialMediaData;