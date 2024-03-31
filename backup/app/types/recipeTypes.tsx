export enum RecipeTypes {
    BREAKFAST = "BREAKFAST",
    LUNCH = "LUNCH",
    DINNER = "DINNER",
    DESSERT = "DESSERT",
}
export enum RecipeCategories {
    American = "American",
    Asian = "Asian",
    African = "African",
    British = "British",
    Chinese = "Chinese",
    European = "European",
    Indonesian = "Indonesian",
    Indian = "Indian",
    Italian = "Italian",
    Japanese = "Japanese",
    Korean = "Korean",
    Lebanese = "Lebanese",
    Malaysian = "Malaysian",
    Mexican = "Mexican",
    MiddleEastern = "MiddleEastern",
    Pakistani = "Pakistani",
    Polish = "Polish",
    Portuguese = "Portuguese",
    Romanian = "Romanian",
    SriLanka = "Sri Lanka",
    Thai = "Thai",
    Turkish = "Turkish",
    Ukrainian = "Ukrainian",
    Vegan = "Vegan",
}
export type Form = {
    recipeName: string | null;
    type: RecipeTypes | null;
    ingredient: Ingredient[] | null;
    steps: string[] | null;
}
export type ReceipeData = {
    recipeID?: string;
    recipeName: string;
    type: RecipeTypes;
    ingredient: Ingredient[];
    steps: string[];
    imgURL?: string;
};
export interface Ingredient {
    id: string;
    ingredientName: string;
    ingredientAmount: string;
    [key: string]: string | number;
}
export interface Steps {
    id: string;
    step: string;
    [key: string]: string | number;
}
export type UploadFormFile = {
    file: File,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
};
export type UploadFormError = {
    error: string,
    setError: React.Dispatch<React.SetStateAction<string | null>>
};
export const cardStyle = {
    padding: "2%",
    height: "250px",
    width: "700px",
    maxHeight: "250px",
    backgroundColor: 'var(--darkColor)',
    overflow: "hidden",
    color: "var(--lighterColor)",
    display: "grid",
    gridTemplateColumns: "1fr 1fr"
}