'use client'
import { FormEventHandler } from "react";
import './grocery.css'
import { CreateNewGroceryFormProps } from "./page";

enum GroceryItemType {
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
    groceryItemType : GroceryItemType,
    groceryItemcount : string,
    groceryItemPrice: string,
    groceryShop: string,


}

const CreateNewGroceryItem = ( { visibility, setVisibility }: CreateNewGroceryFormProps ) => {

    const getFormValue = (formData: FormData) => (key: string) => {
        const field = formData.get(key);
        if (field === null || field === undefined || field === "") {
            return null;
        } 
        return field;
    };

    const SubmitNewGroceryItem: FormEventHandler<HTMLFormElement> = async (event) => ( submitType : string ) => {
        //Prevent browser reload content
        event.preventDefault();
        const { currentTarget } = event;
        const formData = new FormData(currentTarget);
        const groceryItemName = getFormValue(formData)("groceryItemName") as string;
        const groceryItemType = getFormValue(formData)("groceryItemType") as GroceryItemType;
        const groceryItemcount = getFormValue(formData)("groceryItemcount") as string;
        const groceryItemPrice = getFormValue(formData)("groceryItemPrice") as string;
        const groceryShop = getFormValue(formData)("groceryShop") as string;
     
        const groceryItem: GroceryItem = {
           groceryItemName,
           groceryItemType,
           groceryItemcount,
           groceryItemPrice,
           groceryShop,
        }
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
                    <select name="groceryType" id="groceryType">
                        <option value="Carbohydrates">Carbohydrates</option>
                        <option value="Meat/Eggs">Meat/Eggs</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Frozen">Frozen</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Beverage">Beverage</option>
                        <option value="Household">Household</option>
                        <option value="Pets">Pets</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="groceryItemCount">Count: </label>
                    <input type="text" id="groceryItemCount" name="groceryItemCount" placeholder=" 3 Pieces"/>
                </div>
                <div>
                    <label htmlFor="groceryItemPrice">Minimum Price: </label>
                    <input type="text" id="groceryItemPrice" name="groceryItemCount" placeholder=" £10"/>
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