'use client'
import { Dispatch, SetStateAction, useState } from "react"
import HomeRecipeNavBar from "../home-recipe/NavBar"
import CreateNewGroceryItem, { GroceryBuyState, GroceryItem, GroceryType } from "./CreateNewGroceryItem"
import './grocery.css'
import GoodToBuy from "./GoodToBuy"

// export type Grocery = {
//     groceryName : string,
//     count : number,
//     groceryImg : string,
// }
export type CreateNewGroceryFormProps = {
    existingFormValue: GroceryItem,
    setExistingFormValue: Dispatch<SetStateAction<GroceryItem>>,
    visibility: boolean,
    setVisibility: Dispatch<SetStateAction<boolean>>,
    groceryBuyState: GroceryBuyState
};
export type GoodToBuyProps = {
    existingFormValue?: GroceryItem,
    setExistingFormValue: Dispatch<SetStateAction<GroceryItem>>,
    visibility: boolean,
    setVisibility: Dispatch<SetStateAction<boolean>>,
    groceryBuyState: GroceryBuyState
};
export const emptyFormValue: GroceryItem = {
    groceryID: undefined,
    groceryItemName: "",
    groceryItemType: GroceryType.Carbohydrates,
    groceryItemCount: "",
    groceryItemPrice: "",
    groceryShop: "",
    groceryBuyState: GroceryBuyState.GoodToBuy,
}

const GroceryHome = () => {

    const [visibility, setVisibility] = useState<boolean>(false);
    const [existingFormValue, setExistingFormValue] = useState<GroceryItem>(emptyFormValue);
    const [groceryBuyState, setGroceryBuyState] = useState<GroceryBuyState>(GroceryBuyState.GoodToBuy);

    const openNewGroceryFrom = (groceryBuyStateParam: GroceryBuyState) => {
        setExistingFormValue(emptyFormValue);
        setGroceryBuyState(groceryBuyStateParam);
        setVisibility(true);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const renderToBuys = (groceryBuyState: GroceryBuyState) => {
        return (
            <div id="GoodToBuy">
                <div>< GoodToBuy visibility={visibility}
                    existingFormValue={existingFormValue}
                    setExistingFormValue={setExistingFormValue}
                    setVisibility={setVisibility}
                    groceryBuyState={groceryBuyState} />
                </div>
            </div>
        )
    }
    return (
        <div className="body">
            <div><HomeRecipeNavBar /></div>
            <br></br>
            <div id="subNav">
                <div id="GroceryListNav">Grocery List</div>
                <div>Grocery Shops</div>
            </div>
            <div style={{ width: "100vw" }}>
                <CreateNewGroceryItem
                    setExistingFormValue={setExistingFormValue}
                    existingFormValue={existingFormValue}
                    visibility={visibility}
                    setVisibility={setVisibility}
                    groceryBuyState={groceryBuyState} />
            </div>

            <div id="GroceryMainPageBody">
                {/* Good To buy, Must Buy, Stock */}
                <div className="GrocerytoByList">
                    <div id="goodToBuyLabel">
                        <label>Good To Buy </label>
                        <button onClick={() => openNewGroceryFrom(GroceryBuyState.GoodToBuy)} className="addGroceryBtn"> + </button>
                    </div>
                    {renderToBuys(GroceryBuyState.GoodToBuy)}
                </div>

                <div className="GrocerytoByList">
                    <div id="goodToBuyLabel">
                        <label>Must Buy </label>
                        <button onClick={() => openNewGroceryFrom(GroceryBuyState.MustBuy)} className="addGroceryBtn"> + </button>
                    </div>
                    {renderToBuys(GroceryBuyState.MustBuy)}
                </div>
                <div className="GrocerytoByList">
                    <div id="goodToBuyLabel">
                        <label>Home Stock</label>
                        <button onClick={() => openNewGroceryFrom(GroceryBuyState.GoodToBuy)} className="addGroceryBtn"> + </button>
                    </div>
                    {renderToBuys(GroceryBuyState.HomeStock)}

                </div>
            </div>

        </div>
    )
}

export default GroceryHome;