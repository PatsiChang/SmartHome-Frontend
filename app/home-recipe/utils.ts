//Add functions for global use

//Validations for Recipe Registration
export const newRecipeValication = (formData: FormData) => {
    let recipeName = formData.get("recipeName");
    console.log(recipeName);
}