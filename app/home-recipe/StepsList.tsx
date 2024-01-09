import { MouseEventHandler } from "react";
import { v4 as uuidv4 } from "uuid"

export interface Steps {
    id: string;
    step: string;
    [key: string]: string | number;
}
interface StepsListProps {
    stepsInput: Steps[];
    setStepsInput: React.Dispatch<React.SetStateAction<Steps[]>>;
  }

const StepList = ({ stepsInput, setStepsInput }: StepsListProps ) => {

    //Add new Input Fields
    const addNewStepsInputFields : MouseEventHandler<HTMLButtonElement> = (e) => {
        setStepsInput( ( previousInput ) => [...previousInput, { id: uuidv4(), step: ''}]);
    }

    //Change IngredientState with input fields Index
    const handleInputChange = (idx: number, field: string, value: string) => {
        const newStepsInput = [...stepsInput];
        newStepsInput[idx][field] = value;
        if(newStepsInput[idx].id!==""){
            setStepsInput(newStepsInput);
        }else{
            newStepsInput[idx].id = uuidv4();
            setStepsInput(newStepsInput);
        }
        
    };

    //Delete Row
    const deleteRow = (id: string) => {
        setStepsInput((prevSteps) => prevSteps.filter(
            (step) => step.id !== id )
        );
    }

    return(
        <div id="ingredientListBody">
             {/* <label htmlFor="stepsParts">Steps: </label> */}
             {
                stepsInput.map((step, idx) => {
                    return (
                        <div id="stepsParts" key= {step.id}>
                            <div className="ingredientSubLabel" >
                                <div>
                                    <input type="textfield" value = {step.step} onChange={(e) => handleInputChange(idx, 'step', e.target.value)} />
                                </div>
                            </div>
                            <div id="deleteIngredientRow" onClick={ () => deleteRow(step.id) }></div>
                        </div>
                    )
                })
            }
            <button type="button" id="addIngredient" onClick={ addNewStepsInputFields }>Add Steps</button>
        </div>               
    )
}

export default StepList;

