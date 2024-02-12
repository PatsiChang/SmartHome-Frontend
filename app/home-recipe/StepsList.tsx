import { MouseEventHandler, useState } from "react";
import { v4 as uuidv4 } from "uuid"

export interface Steps {
    id: string;
    step: string;
    [key: string]: string | number;
}
interface StepsListProps {
    stepsInput: string[];
    setStepsInput: React.Dispatch<React.SetStateAction<string[]>>;
  }

const StepList = ({ stepsInput, setStepsInput }: StepsListProps ) => {
    
    const [stepListInStepsType, setStepListInStepsType] = useState<Steps[]>([{ id: '', step: '' }])

    const changeStepToString = ( steps: Steps[]) => {
        let stepInStringType : string[] = [];
        steps.forEach((step)=>{
            stepInStringType.push(step.step);
        })
        setStepsInput(stepInStringType)
    }
    const changeStringToStep = ( steps: string[]) => {
        let stepInStepType : Steps[] = [];
        steps.forEach((step)=>{
            stepInStepType.push({ id: uuidv4(), step: step})
        })
        setStepListInStepsType(stepInStepType)
    }
    changeStringToStep;

    //Add new Input Fields
    const addNewStepsInputFields : MouseEventHandler<HTMLButtonElement> = (e) => {
        setStepListInStepsType( ( previousInput ) => [...previousInput, { id: uuidv4(), step: ''}]);
    }

    //Change IngredientState with input fields Index
    const handleInputChange = (idx: number, field: string, value: string) => {
        const newStepsInput = [...stepListInStepsType];
        newStepsInput[idx][field] = value;
        if(newStepsInput[idx].id!==""){
            setStepListInStepsType(newStepsInput);
            changeStepToString(stepListInStepsType);
        }else{
            newStepsInput[idx].id = uuidv4();
            setStepListInStepsType(newStepsInput);
        }
        
    };

    //Delete Row
    const deleteRow = (id: string) => {
        setStepListInStepsType((prevSteps) => prevSteps.filter(
            (step) => step.id !== id )
        );
    }

    return(
        <div id="ingredientListBody">
             {/* <label htmlFor="stepsParts">Steps: </label> */}
             {
                stepListInStepsType.map((step, idx) => {
                    return (
                        <div key= {step.id}>
                            <div className="stepsParts" >
                                <div id="StepListInputContainer">
                                    <input id="StepListInput" type="text" value = {step.step} onChange={(e) => handleInputChange(idx, 'step', e.target.value)} />
                                </div>
                                <div id="deleteIngredientRow" onClick={ () => deleteRow(step.id) }>
                                { idx != 0 && <div> - </div> }
                                </div>
                            </div>
                            
                        </div>
                    )
                })
            }
            <button type="button" id="addIngredient" onClick={ addNewStepsInputFields }>Add Steps</button>
        </div>               
    )
}

export default StepList;

