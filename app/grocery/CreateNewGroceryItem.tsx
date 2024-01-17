'use client'
import { FormEventHandler, useState } from "react";
import './grocery.css'
import { CreateNewGroceryFormProps } from "./page";
import UseGroceryData, { groceryRestfulType } from "../hooks/UseGroceryData";

enum GroceryType {
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
export type GroceryItem = {
    groceryItemName : string,
    groceryItemType : GroceryType,
    groceryItemCount : string,
    groceryItemPrice: string,
    groceryShop: string,


}

const CreateNewGroceryItem = ( { visibility, setVisibility }: CreateNewGroceryFormProps ) => {

    const useGroceryData = UseGroceryData;
    const[selectedGroceryItemType, setSelectedGroceryItemType] = useState<GroceryType>(GroceryType.Carbohydrates);

    //Set groceryType DropDown menu value
    const handleGroceryTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedGroceryItemType(value as GroceryType); 
    };


    const getFormValue = (formData: FormData) => (key: string) => {
        const field = formData.get(key);
        if (field === null || field === undefined || field === "") {
            return null;
        } 
        return field;
    };
    // => ( submitType : string ) 
    const SubmitNewGroceryItem: FormEventHandler<HTMLFormElement> = async (event) => {
        //Prevent browser reload content
        event.preventDefault();
        console.log("Inside Submit")
        const { currentTarget } = event;
        const formData = new FormData(currentTarget);
        const groceryItemName = getFormValue(formData)("groceryItemName") as string;
        const groceryItemType = selectedGroceryItemType;
        const groceryItemCount = getFormValue(formData)("groceryItemCount") as string;
        const groceryItemPrice = getFormValue(formData)("groceryItemPrice") as string;
        const groceryShop = getFormValue(formData)("groceryShop") as string;
     
        const groceryItem: GroceryItem = {
           groceryItemName,
           groceryItemType,
           groceryItemCount,
           groceryItemPrice,
           groceryShop,
        }
        useGroceryData({action: groceryRestfulType.POST, groceryRegisterForm: groceryItem});
        console.log("Inside Submit called hook")
    };

    const closeGroceryForm = () => { setVisibility(false); }



    return visibility? (

        // onSubmit={SubmitNewGroceryItem}
        <form id="createGroceryForm"  onSubmit={SubmitNewGroceryItem}>
            <div id="createGroceryInputForm" >
                <div>
                    <label htmlFor="groceryItemName">Name: </label>
                    <input type="text" id="groceryItemName" name="groceryItemName" placeholder=" Brown Rice"/>
                </div>
                <div>
                    <label htmlFor="groceryType">Type: </label>
                    <select name="groceryType" id="groceryType" onChange={handleGroceryTypeChange}>
                        <option value={GroceryType.Carbohydrates} >Carbohydrates</option>
                        <option value={GroceryType.MeatEggs}>Meat/Eggs</option>
                        <option value={GroceryType.Bakery}>Bakery</option>
                        <option value={GroceryType.Frozen}>Frozen</option>
                        <option value={GroceryType.Vegetables}>Vegetables</option>
                        <option value={GroceryType.Fruits}>Fruits</option>
                        <option value={GroceryType.Beverage}>Beverage</option>
                        <option value={GroceryType.Household}>Household</option>
                        <option value={GroceryType.Pets}>Pets</option>
                        <option value={GroceryType.Others}>Others</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="groceryItemCount">Count: </label>
                    <input type="text" id="groceryItemCount" name="groceryItemCount" placeholder=" 3 Pieces"/>
                </div>
                <div>
                    <label htmlFor="groceryItemPrice">Minimum Price: </label>
                    <input type="text" id="groceryItemPrice" name="groceryItemPrice" placeholder=" £10"/>
                </div>
                <div>
                    <label htmlFor="groceryShop">Grocery Shop: </label>
                    <input type="text" id="groceryShop" name="groceryShop" placeholder=" Morrisons"/>
                </div>
                <button type="submit" id="SubmitGroceryItem">Submit Item</button>
                <div id="errorCode"></div>
            </div>
            <button id="createGroceryFormCloseBtn" onClick={closeGroceryForm}>Close</button>
          
        </form>
    ) : <></>;
}

export default CreateNewGroceryItem;