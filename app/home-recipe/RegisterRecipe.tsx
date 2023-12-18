'use client'
import React, { useState, FormEventHandler, useRef } from "react";
import { HomeRecipeState } from "./page";
import ProgressBar from "./ProgressBar";
import useRecipeData, { ACTION, GetRecipeType } from "../hooks/UseRecipeData";
import { newRecipeValication } from "./utils";
import IngredientList from "./IngredientList";

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
type onchangeEvent = React.ChangeEvent<HTMLInputElement>;

export type Form = {
    recipeName : string | null;
    selectedOptionRadio : RecipeTypes | null;
    ingredientMap  : Map<string, string> | null;
    steps : string | null;
}

//Restrict File Types
const ImgTypes = ['image/png', 'image/jpeg']

enum RecipeTypes {
    BREAKFAST = "BREAKFAST",
    BRUNCH = "BRUNCH",
    LUNCH = "LUNCH",
    DINNER = "DINNER",
}

const RegisterRecipe = ({ propsTrigger, setPropsTrigger }: RegisterRecipeProps) => {

    //useState Hooks
    const[imgUrl, setImgUrl] = useState<string | null>(null);
    const[file, setFile] = useState<File | null>(null);
    const[error, setError] = useState<string | null>(null);
    const[imgState, setImgState] = useState<string | null>("Add Recipe Icon");
    const[selectedOptionRadio, setSelectedOptionRadio] = useState<RecipeTypes>(RecipeTypes.BREAKFAST);
    const ingredientRef = useRef <HTMLInputElement> (null);
    const ingredientAmountRef = useRef <HTMLInputElement> (null);

    const { postData }  = useRecipeData();

    //Set Radio Button Types
    const handleRadioChange = (event: onchangeEvent) => {
        const { value } = event.target;
        setSelectedOptionRadio(value as RecipeTypes) 
        console.log(selectedOptionRadio);
    };

    //Upload Recipe Image
    const changeHandler = (e: onchangeEvent) => {
        if (!e.target.files) return;
        let selected = e.target.files[0];
        if(selected && ImgTypes.includes(selected.type)){
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
    const validateFormData = (formData: FormData) => {
        newRecipeValication(formData);
        if (formData.get("ingredient")) {
            // formData.append("ingredient", formData.get("ingredient"));
        }
    }

    const getFormValue = (formData: FormData) => (key: string) => {
        const field = formData.get(key);
        if (field === null || field === undefined || field === "") {
            return null;
        } 
        return field;
    };

        
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) =>{
        //Prevent browser reload content
        event.preventDefault();
        const ingredientMap = new Map();
        const { currentTarget } = event;
        const formData = new FormData(currentTarget);
        const recipeName = getFormValue(formData)("recipeName") as string;
        const steps = getFormValue(formData)("steps") as string;

        const form: Form = {
            recipeName, 
            selectedOptionRadio, 
            ingredientMap, 
            steps
        }
        postData({ form });
        setPropsTrigger(false);
    };

    const handleCloseBtnOnClick = () => setPropsTrigger(false);
    
        return propsTrigger ? (
            <div className="registerRecipe">
                <div className="registerRecipeCloseBtn">
                    <button className="close-btn" onClick={handleCloseBtnOnClick}>close</button>
                </div>
                
                <form id="registerRecipePopUp" onSubmit={handleSubmit}>
                    <label id="addRecipeIcons">
                        <input type="file" onChange={changeHandler} />
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
                    </div>
                    <div><IngredientList /></div>
                    <span>Recipe Steps: </span>
                    <input type="textfield" id="steps" placeholder=" Step 1"/>
                    <span id="responce"></span>
                    {/* <button id="addStepsBtn">Add Steps</button> */}
                    <button type="submit" id="submitRecipe">Submit Recipe</button>
                </form>
    
            </div>
        ) : <></>;
    
}

export default RegisterRecipe;