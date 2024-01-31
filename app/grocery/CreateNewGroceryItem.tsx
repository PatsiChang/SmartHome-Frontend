'use client'
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import './grocery.css'
import { CreateNewGroceryFormProps, emptyFormValue } from "./page";
import UseGroceryData from "../hooks/useGroceryData";

export enum GroceryType {
    Carbohydrates = "Carbohydrates",
    MeatEggs = "MeatEggs",
    Bakery = "Bakery",
    Frozen = "Frozen",
    Vegetables = "Vegetables",
    Fruits = "Fruits",
    Beverage = "Beverage",
    Household = "Household",
    Pets = "Pets",
    Others = "Others",
}
export enum GroceryBuyState {
    GoodToBuy = "GoodToBuy",
    MustBuy = "MustBuy",
    HomeStock = "HomeStock"

}
export type GroceryItem = {
    groceryID?: string
    groceryItemName : string,
    groceryItemType : GroceryType,
    groceryItemCount : string,
    groceryItemPrice: string,
    groceryShop: string,
    groceryBuyState: GroceryBuyState,
}

const CreateNewGroceryItem = ( {existingFormValue, setExistingFormValue, visibility, setVisibility, groceryBuyState}: CreateNewGroceryFormProps ) => {
    const { postData, getData } = UseGroceryData();
    const [groceryItemState, setGroceryItemState] = useState<GroceryItem>(existingFormValue);
    console.log(existingFormValue.groceryID)

    useEffect(() => {
        setGroceryItemState(existingFormValue)
    }, [existingFormValue]) 

    const handleGroceryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGroceryItemState({
            ...groceryItemState,
            groceryItemName: e.target.value
        })
    };
    const handleGroceryTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGroceryItemState({
            ...groceryItemState,
            groceryItemType: e.target.value as GroceryType
        })
    };
    const handleGroceryCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGroceryItemState({
            ...groceryItemState,
            groceryItemCount: e.target.value
        })
    };
    const handleGroceryPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGroceryItemState({
            ...groceryItemState,
            groceryItemPrice: e.target.value
        })
    };
    const handleGroceryShopChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGroceryItemState({
            ...groceryItemState,
            groceryShop: e.target.value
        })
    };

    // => ( submitType : string ) 
    const SubmitNewGroceryItem: FormEventHandler<HTMLFormElement> = async (event) => {
        //Prevent browser reload content
        event.preventDefault();
        console.log("Inside Submit")
        await postData({ groceryRegisterForm: groceryItemState, groceryBuyState: groceryBuyState });
        await getData({groceryBuyState: groceryBuyState});
        setExistingFormValue(emptyFormValue);
        setGroceryItemState(existingFormValue);
        setVisibility(false);
    };

    const closeGroceryForm = () => { setVisibility(false); }

    return visibility? (

        // onSubmit={SubmitNewGroceryItem}
        <div id="createGroceryFormContainer">
            <form id="createGroceryForm"  onSubmit={SubmitNewGroceryItem}>
            <div id="createGroceryInputForm" >
                <div>
                    <label htmlFor="groceryItemName">Name: </label>
                    <input type="text" id="groceryItemName" name="groceryItemName" placeholder=" Rice"
                    onChange={handleGroceryNameChange} 
                    value={groceryItemState.groceryItemName}/>
                </div>
                <div>
                    <label htmlFor="groceryType">Type: </label>
                    <select name="groceryType" id="groceryType" onChange={handleGroceryTypeChange} value={groceryItemState.groceryItemType}>
                        {Object.values(GroceryType).map((groceryType) =>{
                                return( <option key={groceryType} value={groceryType}> {groceryType} </option>)
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="groceryItemCount">Count: </label>
                    <input type="text" id="groceryItemCount" name="groceryItemCount" placeholder=" 3 Pieces"
                     onChange={handleGroceryCountChange} 
                     value={groceryItemState.groceryItemCount} />
                </div>
                <div>
                    <label htmlFor="groceryItemPrice">Minimum Price: </label>
                    <input type="text" id="groceryItemPrice" name="groceryItemPrice" placeholder=" £10"
                     onChange={handleGroceryPriceChange} 
                     value={groceryItemState.groceryItemPrice} />
                </div>
                <div>
                    <label htmlFor="groceryShop">Grocery Shop: </label>
                    <input type="text" id="groceryShop" name="groceryShop" placeholder=" Morrisons"
                     onChange={handleGroceryShopChange} 
                     value={groceryItemState.groceryShop} />
                </div>
                <button type="submit" id="SubmitGroceryItem">Submit Item</button>
                <div id="errorCode"></div>
            </div>
            <button id="createGroceryFormCloseBtn" onClick={closeGroceryForm}>Close</button>
          
            </form>
        </div>
        
    ) : <></>;
}

export default CreateNewGroceryItem;