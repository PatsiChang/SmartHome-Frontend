// Add functions for global use
import { Form, ReceipeData } from "../types/recipeTypes";


// Validations for Recipe Registration
export const newRecipeValidation = ({ form, recipeList }: { form: Form, recipeList: ReceipeData[] }) => {
    const recipeNameExist = recipeList.some((recipe) => {
        return recipe.recipeName === form.recipeName;
    })
    return recipeNameExist;
}

//Return Images
export const getImages = (imgURL: string | undefined) => {
    if (imgURL != null || imgURL != undefined) {
        return `http://localhost:8080/RecipeIcons/${imgURL}.jpg`;
    } else {
        return `http://localhost:8080/recipeIconAlt.jpg`;
    }
}

//Return socialMedia Img SocialMediaImg/ProfilePicture/
export const getSocialMediaImages = (imgURL: string | undefined) => {
    if (imgURL != null || imgURL != undefined) {
        return `http://localhost:8080/SocialMediaImg/ProfilePicture//${imgURL}.jpg`;
    } else {
        return `http://localhost:8080/recipeIconAlt.jpg`;
    }
}


