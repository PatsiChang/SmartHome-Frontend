// Add functions for global use
import { ReceipeData } from "../hooks/useRecipeData";
import { Form } from "./RegisterRecipe";


// Validations for Recipe Registration
export const newRecipeValidation = ({ form, recipeList }: { form: Form, recipeList: ReceipeData[] }) => {
    const recipeNameExist = recipeList.some((recipe) => {
        return recipe.recipeName === form.recipeName;
    })
    return recipeNameExist;
}

//Return Images
export const getImages = (imgURL: string|undefined) => {
    if (imgURL != null || imgURL != undefined) {
        return `http://localhost:8080/${imgURL}.jpg`;
    } else {
        return `http://localhost:8080/recipeIconAlt.jpg`;
    }
}