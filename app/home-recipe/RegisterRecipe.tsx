'use client'
import React, { useState, FormEventHandler, useRef, Dispatch, SetStateAction, ChangeEvent, useEffect } from "react";
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
// imgURL: File | null;

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
    console.log("RegisterRecipe existingFormValue.type", existingFormValue.type)
    //useState Hooks
    const[imgUrl, setImgUrl] = useState<string | null>(null);
    const[imgBytes, setImgBytes] = useState<File | null>(null);
    const[file, setFile] = useState<File | null>(null);
    const[error, setError] = useState<string | null>(null);
    const[errorCode, setErrorCode] = useState<string | null>("");
    const[imgState, setImgState] = useState<string | null>("Add Recipe Icon");
    // const[selectedOptionRadio, setSelectedOptionRadio] = useState<RecipeTypes>(() => existingFormValue.type);
    const[ingredientInput, setIngredientInput] = useState<Ingredient[]>([{ id: '', ingredientName: '', ingredientAmount: '' }]);
    const[stepsInput, setStepsInput] = useState<string[]>([""]);
    const[recipeState, setRecipeState] = useState<ReceipeData>(existingFormValue);
    const[recipeFormData, setRecipeFormData] = useState<ReceipeData>(() => existingFormValue);

    console.log("RegisterRecipe recipeFormData.type", recipeFormData.type)
    const { postData, recipeList }  = useRecipeData();


    useEffect(()=>{
        // console.log("Inside Set State useEffect existingFormValue.type", existingFormValue.type)
        // setRecipeState(existingFormValue)
        setRecipeFormData(existingFormValue)
        setIngredientInput(existingFormValue.ingredient)
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
        // e.preventDefault();
        e.stopPropagation();
        // console.log("handleReipeTypeChange e.currentTarget.value ", e.currentTarget.value)
        // console.log("handleReipeTypeChange e.target.value ", e.target.value)
        // console.log("before",recipeState.type)   
      
        // setSelectedOptionRadio(e.currentTarget.value as RecipeTypes);
        // console.log("After selectedOptionRadio",selectedOptionRadio)
        // setRecipeState(prevState => {
        //     return {
        //         ...prevState,
        //         type: e.target.value as RecipeTypes
        //     }

        // })  
        setRecipeFormData(prevState => {
            return {
                ...prevState,
                type: e.target.value as RecipeTypes
            }
        })
        // console.log("after",recipeState.type)   
    };


    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        try {
            //Prevent browser reload content
            event.preventDefault();
            const { currentTarget } = event;
            const formData = new FormData(currentTarget);
            // const recipeName = getFormValue(formData)("recipeName") as string;
            // const type = selectedOptionRadio;
            // const ingredient = createIngredientMap();
            // const ingredient = ingredientInput;
            let steps : string[] = [];
            // stepsInput.forEach((step)=>steps.push(step.step));
            const imgURL = imgBytes as Blob;
        
            // const form: Form = {
            //     recipeName, 
            //     type, 
            //     ingredient, 
            //     steps,
            // }
            // const recipeID = await uploadForm(form);
            // if(recipeID!== null && recipeID !== undefined && imgURL){
            //     await updateRecipeIcon({recipeIDTMP: recipeID, recipeIcon: imgURL});
            // }
        //  window.location.reload();
        } catch (error) {
            console.error(error)
        }

    };


    const handleCloseBtnOnClick = () => {
        setPropsTrigger(false);
        setExistingFormValue(emptyFormValue);
    };

    console.log("RegisterRecipe recipeFormData", recipeFormData)
    console.log("RegisterRecipe recipeFormData.type", recipeFormData.type)
    console.log("RegisterRecipe rRecipeTypes.LUNCH", RecipeTypes.LUNCH)
    console.log("recipeFormData.type  === RecipeTypes.LUNCH", recipeFormData.type  === RecipeTypes.LUNCH)

    const isChecked = (type: RecipeTypes) => {
        console.log("ischecked type", type)
        console.log("ischecked recipeFormData.type", recipeFormData.type)
        console.log("ischecked recipeFormData.type === type", recipeFormData.type === type)
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
                    <div><IngredientList ingredientInput={ingredientInput} setIngredientInput={setIngredientInput} /></div>
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