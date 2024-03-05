
//Return solely the Ingredient Input fields and values
import { MouseEventHandler } from "react";
import { v4 as uuidv4 } from "uuid"
import { ReceipeData } from "../hooks/useRecipeData";

export interface Ingredient {
    id: string;
    ingredientName: string;
    ingredientAmount: string;
    [key: string]: string | number;
}
interface IngredientListProps {
    ingredientInput: Ingredient[];
    setIngredientInput: React.Dispatch<React.SetStateAction<Ingredient[]>>;
    setRecipeFormData: React.Dispatch<React.SetStateAction<ReceipeData>>;
}

const IngredientList = ({ ingredientInput, setIngredientInput, setRecipeFormData }: IngredientListProps) => {

    //Add new Input Fields
    const addNewIngredientInputFields: MouseEventHandler<HTMLButtonElement> = (e) => {
        setIngredientInput((previousInput) => [...previousInput, { id: uuidv4(), ingredientName: '', ingredientAmount: '' }]);
    }

    //Change IngredientState with input fields Index
    const handleInputChange = (idx: number, field: string, value: string) => {
        const newIngredientInput = [...ingredientInput];
        newIngredientInput[idx][field] = value;
        if (newIngredientInput[idx].id !== "") {
            setIngredientInput(newIngredientInput);
            console.log("Added ingredient new lineee1", ingredientInput);

        } else {
            newIngredientInput[idx].id = uuidv4();
            setIngredientInput(newIngredientInput);
            console.log("Added ingredient new lineee2", ingredientInput);

        }

    };


    //Delete Row
    const deleteRow = (id: string) => {
        setIngredientInput((prevIngredients) => prevIngredients.filter(
            (ingredient) => ingredient.id !== id)
        );
    }

    const createIngredientRows = (ingredientInput: Ingredient[]) => {
        return (
            ingredientInput.map((ingredient, idx) => {
                return (
                    <div id="ingredientParts" key={ingredient.id || idx}>
                        <div className="ingredientSubLabel" >
                            {idx === 0 && <div>Ingredient </div>}
                            <div>
                                <input type="text" value={ingredient.ingredientName} onChange={(e) => handleInputChange(idx, 'ingredientName', e.target.value)} />
                            </div>
                        </div>
                        <div className="ingredientSubLabel" >
                            {idx === 0 && <div >Amount </div>}
                            <div>
                                <input type="text" value={ingredient.ingredientAmount} onChange={(e) => handleInputChange(idx, 'ingredientAmount', e.target.value)} />
                            </div>
                        </div>
                        <div id="deleteIngredientRow" onClick={() => deleteRow(ingredient.id)}>
                            {idx != 0 && <div> - </div>}
                        </div>
                    </div>
                )
            })
        )
    }

    return (
        <div id="ingredientListBody">
            <label htmlFor="ingredientParts">Recipe Ingredient: </label>
            {createIngredientRows(ingredientInput)}
            <button type="button" id="addIngredient" onClick={addNewIngredientInputFields}>Add Ingredients</button>
        </div>
    )
}

export default IngredientList;