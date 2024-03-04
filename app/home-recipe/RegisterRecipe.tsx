'use client'
import React, { useState, FormEventHandler, Dispatch, SetStateAction, ChangeEvent, useEffect } from "react";
import { HomeRecipeState, emptyFormValue } from "./page";
import ProgressBar from "./ProgressBar";
import useRecipeData, { ReceipeData } from "../hooks/useRecipeData";
// import { newRecipeValidation } from "./utils";
import IngredientList, { Ingredient } from "./IngredientList";
import { newRecipeValidation } from "./utils";
import StepsList, { Steps } from "./StepsList";
import { v4 as uuidv4 } from "uuid"


// import { newRecipeValidation } from "./utils";

//Types
type RegisterRecipeProps = {
    propsTrigger: HomeRecipeState['propsTrigger'],
    setPropsTrigger: HomeRecipeState["setPropsTrigger"],
    existingFormValue: ReceipeData,
    setExistingFormValue: Dispatch<SetStateAction<ReceipeData>>,
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

//Restrict File Types
const ImgTypes = ['image/png', 'image/jpeg']

export enum RecipeTypes {
    BREAKFAST = "BREAKFAST",
    BRUNCH = "BRUNCH",
    LUNCH = "LUNCH",
    DINNER = "DINNER",
    DESSERT = "DESSERT",

}
const RegisterRecipe = ({ propsTrigger, setPropsTrigger, existingFormValue, setExistingFormValue }: RegisterRecipeProps) => {
    //useState Hooks
    const[imgUrl, setImgUrl] = useState<string | null>(null);
    const[imgBytes, setImgBytes] = useState<File | null>(null);
    const[file, setFile] = useState<File | null>(null);
    const[error, setError] = useState<string | null>(null);
    const[errorCode, setErrorCode] = useState<string | null>("");
    const[imgState, setImgState] = useState<string | null>("Add Recipe Icon");
    const[ingredientInput, setIngredientInput] = useState<Ingredient[]>([{ id: '', ingredientName: '', ingredientAmount: '' }]);
    const[stepsInput, setStepsInput] = useState<Steps[]>([{ id: '', step: '' }]);
    const[stepsInStringArray, setStepsInStringArray] = useState<string[]>();
    const[recipeFormData, setRecipeFormData] = useState<ReceipeData>(() => existingFormValue);

    const { postData, recipeList, updateRecipeIcon}  = useRecipeData();


    useEffect(()=>{
        setRecipeFormData(existingFormValue)
        setIngredientInput(existingFormValue.ingredient)
        setStepsInStringArray(existingFormValue.steps)
    },[existingFormValue])


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

    // const getFormValue = (formData: FormData) => (key: string) => {
    //     const field = formData.get(key);
    //     if (field === null || field === undefined || field === "") {
    //         return null;
    //     } 
    //     return field;
    // };
    const changeRecipeStepsToStepType = () => {
        if(stepsInStringArray!== undefined){
            stepsInStringArray.map((step, idx) => {
                if(idx > 0){
                    setStepsInput( ( previousInput ) => [...previousInput, { id: uuidv4(), step: step}]);
                    
                }else{
                    const newStepsInput = [...stepsInput];
                    newStepsInput[idx].id = uuidv4();
                    newStepsInput[idx].step = step;
                    setStepsInput(newStepsInput);
                }
            })
        }
        }
    useEffect(()=>{
        changeRecipeStepsToStepType();
    },[stepsInStringArray])

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

    const handleReipeNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRecipeFormData(prevState => {
            return {
                ...prevState,
                recipeName: e.target.value
            }
        })
    };
    const handleReipeTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setRecipeFormData(prevState => {
            return {
                ...prevState,
                type: e.target.value as RecipeTypes
            }
        })
    };


    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        try {
            //Prevent browser reload content
            event.preventDefault();
            let stepsInStringArray : string[] = [];
            stepsInput.forEach((step)=>stepsInStringArray.push(step.step));
            const imgURL = imgBytes as Blob;
            const form : ReceipeData = {
                ...recipeFormData,
                ingredient: ingredientInput,
                steps: stepsInStringArray,
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
    const handleCloseBtnOnClick = () => {
        setPropsTrigger(false);
        setExistingFormValue(emptyFormValue);
        setIngredientInput([{ id: '', ingredientName: '', ingredientAmount: '' }]);
        setStepsInput([{ id: '', step: '' }]);
    };

    const isChecked = (type: RecipeTypes) => {
        return recipeFormData.type === type
    }
    
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
                        <input type="textfield" id="recipeName" name="recipeName" onChange={handleReipeNameChange} value={recipeFormData.recipeName}/>
                    </div>
                    <span>Recipe Type: </span>
                    <div id="radioBtn">
                        <div>
                            <label htmlFor="breakfast">Breakfast </label>
                            <input type="radio" id={RecipeTypes.BREAKFAST} value={RecipeTypes.BREAKFAST}
                            checked = { recipeFormData.type === RecipeTypes.BREAKFAST }
                             onChange={handleReipeTypeChange}/>
                        </div>
                        <div>
                            <label htmlFor="lunch">Lunch </label>
                            <input type="radio" id={RecipeTypes.LUNCH} value={RecipeTypes.LUNCH} name={RecipeTypes.LUNCH}
                            checked = {isChecked(RecipeTypes.LUNCH)}
                            onChange={handleReipeTypeChange}/>
                        </div>
                        <div>
                            <label htmlFor="dinner">Dinner </label>
                            <input type="radio" id={RecipeTypes.DINNER} value={RecipeTypes.DINNER}
                            checked = { recipeFormData.type  === RecipeTypes.DINNER }
                            onChange={handleReipeTypeChange}/>
                        </div>
                        <div>
                            <label htmlFor="dessert">Dessert </label>
                            <input type="radio" id={RecipeTypes.DESSERT} value={RecipeTypes.DESSERT}
                            checked = { recipeFormData.type  === RecipeTypes.DESSERT }
                            onChange={handleReipeTypeChange}/>
                        </div>
                    </div>
                    <div><IngredientList ingredientInput={ingredientInput} setIngredientInput={setIngredientInput} 
                            setRecipeFormData={setRecipeFormData} /></div>
                    <span>Recipe Steps: </span>
                    <div><StepsList stepsInput={stepsInput} setStepsInput={setStepsInput}
                            stepsInStringArray={stepsInStringArray} /></div>

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