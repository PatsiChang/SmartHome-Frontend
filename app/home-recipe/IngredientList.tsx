
//Return solely the Ingredient Input fields and values
import { MouseEventHandler, useState } from "react";

interface Ingredient {
    id: number;
    ingredientName: string;
    ingredientAmount: string;
    [key: string]: string | number;
}

const IngredientList = () => {
    const[ingredientInput, setIngredientInput] = useState<Ingredient[]>([{ id: 0, ingredientName: '', ingredientAmount: '' }]);

    //Add new Input Fields
    const addNewIngredientInputFields : MouseEventHandler<HTMLButtonElement> = (e) => {
        setIngredientInput([...ingredientInput, { id: ingredientInput.length, ingredientName: '', ingredientAmount: '' }]);
    }

    //Change IngredientState with input fields Index
    const handleInputChange = (idx: number, field: string, value: string) => {
        const newIngredientInput = [...ingredientInput];
        newIngredientInput[idx][field] = value;
      
        setIngredientInput(newIngredientInput);
        console.log("After Adding into the array", ingredientInput)
    };

    //Delete Row
    const deleteRow = (idx: number) => {
        
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
                            <div id="deleteIngredientRow" >
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