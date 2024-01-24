import UseGroceryData, { groceryRestfulType } from "../hooks/useGroceryData";
import { GroceryBuyState, GroceryItem, GroceryType } from "./CreateNewGroceryItem";
import './grocery.css'


type DeleteGroceryItemBtn = (groceryID: string, groceryBuyState: GroceryBuyState) => React.MouseEventHandler<HTMLButtonElement>

const GoodToBuy = ({groceryBuyState} : {groceryBuyState : GroceryBuyState}) => {
    const { goodToBuyGroceryList, mustBuyGroceryList, deleteData, getData } = UseGroceryData();
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
    const renderGroceryListWithBuyState = (groceryList: GroceryItem[]) => {
        return(
            <div>
            <div className="ListByType">
                <label>Carbohydrates</label>
                {groceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Carbohydrates))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string, groceryItem.groceryBuyState)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Meat & Eggs</label>
                {groceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.MeatEggs))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string, groceryItem.groceryBuyState)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Bakery</label>
                {groceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Bakery))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button className="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string, groceryItem.groceryBuyState)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Frozen</label>
                {groceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Frozen))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string, groceryItem.groceryBuyState)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Fruits</label>
                {groceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Fruits))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string, groceryItem.groceryBuyState)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Vegetables</label>
                {groceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Vegetables))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string, groceryItem.groceryBuyState)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Beverage</label>
                {groceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Beverage))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string, groceryItem.groceryBuyState)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Household</label>
                {groceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Household))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string, groceryItem.groceryBuyState)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Pets</label>
                {groceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Pets))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string, groceryItem.groceryBuyState)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Others</label>
                {groceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Others))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string, groceryItem.groceryBuyState)}>-</button></div>
                    </div>

                ))}
            </div>
        </div>
        )

    }
  
    return(
        <div className="goodToBuyList">
            {groceryBuyState === GroceryBuyState.GoodToBuy && renderGroceryListWithBuyState(goodToBuyGroceryList)}
            {groceryBuyState === GroceryBuyState.MustBuy && renderGroceryListWithBuyState(mustBuyGroceryList)}
        </div>
    )

}

export default GoodToBuy;