import { ReceipeData, RecipeCategories } from "./recipeTypes";

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
export enum AccountType {
    privateAccount = "privateAccount",
    publicAccount = "publicAccount",
}
export enum AccountStatus {
    Active = "Active",
    Inactive = "Inactive",
    Deactivate = "Deactivate",
    Suspended = "Suspended",
    Closed = "Closed",
}