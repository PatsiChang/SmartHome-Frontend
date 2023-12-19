
//Return solely the Ingredient Input fields and values
import { MouseEventHandler, useState } from "react";
import { v4 as uuidv4 } from "uuid"

export interface Ingredient {
    id: string;
    ingredientName: string;
    ingredientAmount: string;
    [key: string]: string | number;
}
interface IngredientListProps {
    ingredientInput: Ingredient[];
    setIngredientInput: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  }

const IngredientList = ({ ingredientInput, setIngredientInput }: IngredientListProps ) => {

    //Add new Input Fields
    const addNewIngredientInputFields : MouseEventHandler<HTMLButtonElement> = (e) => {
        setIngredientInput([...ingredientInput, { id: uuidv4(), ingredientName: '', ingredientAmount: '' }]);
    }

    //Change IngredientState with input fields Index
    const handleInputChange = (idx: number, field: string, value: string) => {
        const newIngredientInput = [...ingredientInput];
        newIngredientInput[idx][field] = value;
      
        setIngredientInput(newIngredientInput);
        console.log("After Adding into the array", ingredientInput)
    };

    //Delete Row
    const deleteRow = (id: string) => {
        setIngredientInput((prevIngredients) => prevIngredients.filter(
            (ingredient) => ingredient.id !== id )
        );
    }

    return(
        <div id="ingredientListBody">
             <label htmlFor="ingredientParts">Recipe Ingredient: </label>
             {
                ingredientInput.map((ingredient, idx) => {
                    return (
                        <div id="ingredientParts" key= {ingredient.id}>
                            <div id="ingredientSubLabel" >
                                { idx === 0 && <div>Ingredient </div> }
                                <div>
                                    <input type="textfield" value = {ingredient.ingredientName} onChange={(e) => handleInputChange(idx, 'ingredientName', e.target.value)} />
                                </div>
                            </div>
                            <div id="ingredientSubLabel" >
                                { idx === 0 && <div>Amount </div> }
                                <div>
                                    <input type="textfield" value = {ingredient.ingredientAmount}  onChange={(e) => handleInputChange(idx, 'ingredientAmount', e.target.value)} />
                                </div>
                            </div>
                            <div id="deleteIngredientRow" onClick={ () => deleteRow(ingredient.id) }>
                                { idx != 0 && <div> - </div> }
                            </div>
                        </div>
                    )
                })
            }
            <button type="button" id="addIngredient" onClick={ addNewIngredientInputFields }>Add Ingredients</button>
        </div>               
    )
}

export default IngredientList;