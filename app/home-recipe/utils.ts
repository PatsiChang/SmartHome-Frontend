// Add functions for global use
import { ReceipeData } from "../hooks/UseRecipeData";
import { Form } from "./RegisterRecipe";


// Validations for Recipe Registration
export const newRecipeValidation = ({form, recipeList}: {form: Form, recipeList: ReceipeData[]}) => {
    const recipeNameExist = recipeList.some((recipe) => {
        return recipe.recipeName === form.recipeName;
    })
    return recipeNameExist;
}