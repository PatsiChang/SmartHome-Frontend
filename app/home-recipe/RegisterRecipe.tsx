'use client'
import React, { useState, FormEventHandler, useRef } from "react";
import { HomeRecipeState } from "./page";
import ProgressBar from "./ProgressBar";
import useRecipeData, { ACTION, GetRecipeType } from "../hooks/useRecipeData";
// import { newRecipeValidation } from "./utils";
import IngredientList, { Ingredient } from "./IngredientList";
import { newRecipeValidation } from "./utils";
import StepsList, { Steps } from "./StepsList";
// import { newRecipeValidation } from "./utils";

//Types
type RegisterRecipeProps = {
    propsTrigger: HomeRecipeState['propsTrigger'];
    setPropsTrigger: HomeRecipeState["setPropsTrigger"];
}
export type UploadFormFile = {
    file: File,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
};
export type UploadFormError = {
    error: string,
    setError: React.Dispatch<React.SetStateAction<string | null>>
};
export type UploadFormState = UploadFormFile & UploadFormError;
export type onchangeEvent = React.ChangeEvent<HTMLInputElement>;

export type Form = {
    recipeName : string | null;
    type : RecipeTypes | null;
    ingredient  : Ingredient[]| null;
    steps : string[] | null;
   
}
// imgURL: File | null;

//Restrict File Types
const ImgTypes = ['image/png', 'image/jpeg']

enum RecipeTypes {
    BREAKFAST = "BREAKFAST",
    BRUNCH = "BRUNCH",
    LUNCH = "LUNCH",
    DINNER = "DINNER",
    DESSERT = "DESSERT",

}
const RegisterRecipe = ({ propsTrigger, setPropsTrigger }: RegisterRecipeProps) => {

    //useState Hooks
    const[imgUrl, setImgUrl] = useState<string | null>(null);
    const[imgBytes, setImgBytes] = useState<File | null>(null);
    const[file, setFile] = useState<File | null>(null);
    const[error, setError] = useState<string | null>(null);
    const[errorCode, setErrorCode] = useState<string | null>("");
    const[imgState, setImgState] = useState<string | null>("Add Recipe Icon");
    const[selectedOptionRadio, setSelectedOptionRadio] = useState<RecipeTypes>(RecipeTypes.BREAKFAST);
    const[ingredientInput, setIngredientInput] = useState<Ingredient[]>([{ id: '', ingredientName: '', ingredientAmount: '' }]);
    const[stepsInput, setStepsInput] = useState<Steps[]>([{ id: '', step: '' }]);


    const { postData, updateRecipeIcon, recipeList, getData }  = useRecipeData();

    //Set Radio Button Types
    const handleRadioChange = (event: onchangeEvent) => {
        const { value } = event.target;
        setSelectedOptionRadio(value as RecipeTypes); 
    };

    //Edit Recipe
    const updateRecipe = () => {

    }

    //Upload Recipe Image
    const changeHandler = (e: onchangeEvent) => {
        if (!e.target.files) return;
        let selected = e.target.files[0];
        if(selected && ImgTypes.includes(selected.type)){
                setImgBytes(selected)
                setFile(selected);
                setImgUrl(URL.createObjectURL(selected));
                setImgState("Change Icon");
                setError('');
        }else {
            setFile(null);
            setError('Not an image file (png or jpeg)');
        }
    }
    // useful library: lodash , yui for form

    const getFormValue = (formData: FormData) => (key: string) => {
        const field = formData.get(key);
        if (field === null || field === undefined || field === "") {
            return null;
        } 
        return field;
    };

    const uploadForm = async (form: Form) => {
        // const recipeID: string = await postData({ form: form });
        //     return recipeID;
        if (!newRecipeValidation({form, recipeList})){
            setErrorCode("");
            const recipeID: string = await postData({ form: form });
            setPropsTrigger(false);
            return recipeID;
        }else{
            setErrorCode("Recipe Name Already Exist!");
            setPropsTrigger(true);
        }
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        try {
            //Prevent browser reload content
            event.preventDefault();
            const { currentTarget } = event;
            const formData = new FormData(currentTarget);
            const recipeName = getFormValue(formData)("recipeName") as string;
            const type = selectedOptionRadio;
            // const ingredient = createIngredientMap();
            const ingredient = ingredientInput;
            let steps : string[] = [];
            stepsInput.forEach((step)=>steps.push(step.step));
            const imgURL = imgBytes as Blob;
        
            const form: Form = {
                recipeName, 
                type, 
                ingredient, 
                steps,
            }
            const recipeID = await uploadForm(form);
            if(recipeID!== null && recipeID !== undefined && imgURL){
                await updateRecipeIcon({recipeIDTMP: recipeID, recipeIcon: imgURL});
            }
        //  window.location.reload();
        } catch (error) {
            console.error(error)
        }

    };

    const handleCloseBtnOnClick = () => setPropsTrigger(false);
    
        return propsTrigger ? (
            <div className="registerRecipe">
                <div className="registerRecipeCloseBtn">
                    <button className="close-btn" onClick={handleCloseBtnOnClick}>close</button>
                </div>
                
                <form id="registerRecipePopUp" onSubmit={handleSubmit}>
                    <label id="addRecipeIcons" >
                        <input type="file" name="recipeImg" onChange={changeHandler} />
                        <span id="addRecipeIcon"> {imgState} </span>
                    </label>
                    <div className="output">
                        { imgUrl && <img id="recipeImg" src = {imgUrl} />}
                        { error && <div className="error">{ error }</div> }
                        { file && <ProgressBar file={file} setFile={setFile}/> }
                    </div>
                    <div>
                        <label htmlFor="recipeName">Recipe Name: </label>
                        <input type="textfield" id="recipeName" name="recipeName"/>
                    </div>
                    <span>Recipe Type: </span>
                    <div id="radioBtn">
                        <div>
                            <label htmlFor="breakfast">Breakfast </label>
                            <input type="radio" id="breakfast" value={RecipeTypes.BREAKFAST}
                             checked = { selectedOptionRadio === RecipeTypes.BREAKFAST } 
                             onChange={handleRadioChange}/>
                        </div>
                        <div>
                            <label htmlFor="lunch">Lunch </label>
                            <input type="radio" id="lunch" value={RecipeTypes.LUNCH}
                            checked = { selectedOptionRadio === RecipeTypes.LUNCH }
                            onChange={handleRadioChange}/>
                        </div>
                        <div>
                            <label htmlFor="dinner">Dinner </label>
                            <input type="radio" id="dinner" value={RecipeTypes.DINNER}
                            checked = { selectedOptionRadio === RecipeTypes.DINNER }
                            onChange={handleRadioChange}/>
                        </div>
                        <div>
                            <label htmlFor="dessert">Dessert </label>
                            <input type="radio" id="dessert" value={RecipeTypes.DESSERT}
                            checked = { selectedOptionRadio === RecipeTypes.DESSERT }
                            onChange={handleRadioChange}/>
                        </div>
                    </div>
                    <div><IngredientList ingredientInput={ingredientInput} setIngredientInput={setIngredientInput}/></div>
                    <span>Recipe Steps: </span>
                    <div><StepsList stepsInput={stepsInput} setStepsInput={setStepsInput}/></div>

                    {/* <input type="textfield" id="steps" name="steps" placeholder=" Steps"/> */}
                    <span id="responce"></span>
                    {/* <button id="addStepsBtn">Add Steps</button> */}
                    <button type="submit" id="submitRecipe">Submit Recipe</button>
                    <div id="errorCode">{errorCode}</div>
                </form>
    
            </div>
        ) : <></>;
    
}

export default RegisterRecipe;