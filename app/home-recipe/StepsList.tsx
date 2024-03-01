import { MouseEventHandler, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"

export interface Steps {
    id: string;
    step: string;
    [key: string]: string | number;
}
interface StepsListProps {
    stepsInput: Steps[];
    setStepsInput: React.Dispatch<React.SetStateAction<Steps[]>>;
    stepsInStringArray?: string[];
  }

const StepList = ({ stepsInput, setStepsInput, stepsInStringArray}: StepsListProps ) => {
    console.log(stepsInput);
    


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
    // const [stepListInStepsType, setStepListInStepsType] = useState<Steps[]>([{ id: '', step: '' }])
    // const changeRecipeStepsToStepType = () => {
    //     if(stepsInStringArray!== undefined){
    //         stepsInStringArray.map((step, idx) => {
    //             console.log("Inside Steps Idx",idx);
    //             console.log("Inside Steps steps",step);
    //             if(idx > 0){
    //                 setStepsInput( ( previousInput ) => [...previousInput, { id: uuidv4(), step: step}]);
                    
    //             }else{
    //                 const newStepsInput = [...stepsInput];
    //                 newStepsInput[idx].id = uuidv4();
    //                 newStepsInput[idx].step = step;
    //                 setStepsInput(newStepsInput);
    //             }
    //         })
    //     }
    //     }
    // useEffect(()=>{
    //     changeRecipeStepsToStepType();
    // },[])
    

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

