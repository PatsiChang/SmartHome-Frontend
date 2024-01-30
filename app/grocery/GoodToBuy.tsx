import { useEffect, useState } from "react";
import UseGroceryData, { groceryRestfulType } from "../hooks/useGroceryData";
import CreateNewGroceryItem, { GroceryBuyState, GroceryItem, GroceryType } from "./CreateNewGroceryItem";
import './grocery.css'
import { CreateNewGroceryFormProps, GoodToBuyProps } from "./page";


type DeleteGroceryItemBtn = (groceryID: string, groceryBuyState: GroceryBuyState) => React.MouseEventHandler<HTMLButtonElement>

const GoodToBuy = ({existingFormValue, setExistingFormValue, visibility, setVisibility, groceryBuyState} : GoodToBuyProps) => {
    const { goodToBuyGroceryList, mustBuyGroceryList, deleteData, getData } = UseGroceryData();
    const [groceryItemVisibility, setGroceryItemVisibility] = useState<boolean>(false)
    console.log("GoodToBuy", goodToBuyGroceryList)

    if (!goodToBuyGroceryList) {
        return null; // or return an empty array: return [];
    }
    const deleteGroceryItemBtn: DeleteGroceryItemBtn = (groceryID) => async (event) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this recipe?");
        // event.stopPropagation();
        if(isConfirmed){
            await deleteData({groceryID: groceryID, groceryBuyState: groceryBuyState});
            await getData({groceryBuyState: groceryBuyState});
            // window.location.reload();
        }
    }
    const toggleGroceryItemDetails = () => {
        return groceryItemVisibility? setGroceryItemVisibility(false) : setGroceryItemVisibility(true);
    }
    const groceryItemDetails = (groceryItem: GroceryItem) => {
        return groceryItemVisibility? (
            <div id="groceryItemDetails" onClick={()=>updateGroceryItem(groceryItem)}>
               <div>{groceryItem.groceryID}</div>
               <div>{groceryItem.groceryItemPrice}</div>
               <div>{groceryItem.groceryShop}</div>
            </div>
        ): <></>;
    }
    const updateGroceryItem = (groceryItem: GroceryItem) => {
            setExistingFormValue(groceryItem);
            
    }
    
    useEffect(() => {
        // This code will run after setExistingFormValue has updated the state
        if (existingFormValue?.groceryID!== undefined){
            setVisibility(true);
        }
      }, [existingFormValue]);
 
    const renderGroceryIndividuals = (groceryItem: GroceryItem) => {
        return(
            <div key = {groceryItem.groceryID}>
                <div onClick={toggleGroceryItemDetails} className="goodToBuyGrocery">
                    <div>{groceryItem.groceryItemName}</div>
                    <div>
                        {groceryItem.groceryItemCount}&nbsp;
                        <button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string, groceryItem.groceryBuyState)}>-</button>
                    </div>
                </div>
                {groceryItemDetails(groceryItem)}
            </div>
            
        )
     
    }
    const renderGroceryIndividualsType = (groceryList: GroceryItem[], groceryType: GroceryType) => {
        return(
            <div className="ListByType">
                <label>{groceryType}</label>
                {groceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType === groceryType))
                    .map((groceryItem) => (
                        renderGroceryIndividuals(groceryItem)
                    ))
                }
            </div>
        )
    }
    const renderGroceryListWithBuyState = (groceryList: GroceryItem[]) => {
        return(
            <div>
                {Object.values(GroceryType).map((groceryType) => {
                    return(
                        <div key={groceryType}>
                            {renderGroceryIndividualsType(groceryList, groceryType)}
                        </div>
                    )
                })}
            </div>
        )
    }
  
    return(
        <div>
             <div className="goodToBuyList">
                {groceryBuyState === GroceryBuyState.GoodToBuy && renderGroceryListWithBuyState(goodToBuyGroceryList)}
                {groceryBuyState === GroceryBuyState.MustBuy && renderGroceryListWithBuyState(mustBuyGroceryList)}
            </div>
        </div>
    )

}

export default GoodToBuy;