'use client'
import { error } from "console";
import React, { ReactComponentElement, ReactPropTypes, useImperativeHandle, useState } from "react";
import { render } from "react-dom";
import handleFormSubmit from '../hooks/FormSubmission'
import { HomeRecipeState } from "./page";

type RegisterRecipeProps = {
    propsTrigger: HomeRecipeState['propsTrigger']
    setPropsTrigger: HomeRecipeState["setPropsTrigger"];
}


const RegisterRecipe = ({ propsTrigger, setPropsTrigger }: RegisterRecipeProps) => {

    const handleSubmit = (form: FormData) => {
        // e.preventDefault();
        // const formData = new FormData(document.getElementById("registerRecipePopUp") as HTMLFormElement);
        const formData = new FormData();
        formData.append("recipeName", "name");
        let recipeType = (document.getElementById("radioBtn") as HTMLInputElement).value;
        formData.append("type", "recipeType");
        formData.append("ingredient", "ingredient");
        formData.append("steps", "name");
        // Call the function to handle the form submission with Fetch API
        handleFormSubmit(formData);
        setPropsTrigger(false);
    };

    const handleCloseBtnOnClick = () => setPropsTrigger(false);
    
        return propsTrigger ? (

            <div className="registerRecipe">
                <div className="registerRecipeCloseBtn">
                    <button className="close-btn" onClick={handleCloseBtnOnClick}>close</button>
                </div>
                
                <form id="registerRecipePopUp" action={handleSubmit}>
                    <div>
                        <label htmlFor="recipeName">Recipe Name: </label>
                        <input type="textfield" id="recipeName" name="recipeName"/>
                    </div>

                    <span>Recipe Type: </span>
                    <div id="radioBtn">
                        <div>
                            <label htmlFor="breakfast">Breakfast </label>
                            <input type="radio" id="breakfast" name="type"/>
                        </div>
                        <div>
                            <label htmlFor="lunch">Lunch </label>
                            <input type="radio" id="lunch" name="type" />
                        </div>
                        <div>
                            <label htmlFor="dinner">Dinner </label>
                            <input type="radio" id="dinner" name="type"/>
                        </div>
                    </div>
                    
    
                    <label htmlFor="ingredient">Recipe Ingredient: </label>
                    <input type="textfield" id="ingredient" name="ingredient"/>
    
                    <span>Recipe Steps: </span>
                    <input type="textfield" id="cookingStep1" placeholder=" Step 1"/>
                    <input type="textfield" id="cookingStep2" placeholder=" Step 2"/>
                    <input type="textfield" id="cookingStep3" placeholder=" Step 3"/>
                    <input type="textfield" id="cookingStep4" placeholder=" Step 4"/>
                    <span id="responce"></span>
                    {/* <button id="addStepsBtn">Add Steps</button> */}
                    <button type="submit" id="submitRecipe" >Submit Recipe</button>
                </form>
    
            </div>
        ) : <></>;
    
}

export default RegisterRecipe;