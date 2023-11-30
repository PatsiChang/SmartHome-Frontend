'use client'
import { error } from "console";
import React, { ReactComponentElement, ReactPropTypes, useState } from "react";
import { render } from "react-dom";
import handleFormSubmit from '../hooks/FormSubmission'

type RegisterRecipeProps = {
    propsTrigger: boolean
}


const RegisterRecipe = ({propsTrigger} : RegisterRecipeProps) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const formData = new FormData(document.getElementById("registerRecipePopUp") as HTMLFormElement);
        const formData = new FormData();
        formData.append("recipeName", "name");
        let recipeType = (document.getElementById("radioBtn") as HTMLInputElement).value;
        formData.append("type", "recipeType");
        formData.append("ingredient", "ingredient");
        formData.append("steps", "name");
        // Call the function to handle the form submission with Fetch API
        handleFormSubmit(formData);
    };
    
    
        return propsTrigger ? (

            <div className="registerRecipe">
                <div className="registerRecipeCloseBtn">
                    <button className="close-btn">close</button>
                </div>
                
                <form id="registerRecipePopUp" onClick={handleSubmit}>
                    <div>
                        <label htmlFor="recipeName">Recipe Name: </label>
                        <input type="text" id="recipeName" name="recipeName" value= ""/>
                    </div>

                    <label htmlFor="type">Recipe Type: </label>
                    <div id="radioBtn">
                        <div>
                            <label htmlFor="breakfast">Breakfast </label>
                            <input type="radio" id="Breakfast" name="type" value="breakfast"/>
                        </div>
                        <div>
                            <label htmlFor="lunch">Lunch </label>
                            <input type="radio" id="lunch" name="type" value="lunch"/>
                        </div>
                        <div>
                            <label htmlFor="dinner">Dinner </label>
                            <input type="radio" id="dinner" name="type" value="dinner"/>
                        </div>
                    </div>
                    
    
                    <label htmlFor="ingredient">Recipe Ingredient: </label>
                    <input type="textfield" id="ingredient" name="ingredient"/>
    
                    <label htmlFor="cookingSteps">Recipe Steps: </label>
                    <input type="textfield" id="cookingStep1" placeholder=" Step 1"/>
                    <input type="textfield" id="cookingStep2" placeholder=" Step 2"/>
                    <input type="textfield" id="cookingStep3" placeholder=" Step 3"/>
                    <input type="textfield" id="cookingStep4" placeholder=" Step 4"/>
                    <span id="responce"></span>
                    {/* <button id="addStepsBtn">Add Steps</button> */}
                    <button type="submit" id="submitRecipe">Submit Recipe</button>
                </form>
    
            </div>
        ) : <></>;
    
}

export default RegisterRecipe;