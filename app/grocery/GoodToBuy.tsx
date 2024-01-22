import UseGroceryData, { groceryRestfulType } from "../hooks/useGroceryData";
import { GroceryType } from "./CreateNewGroceryItem";
import './grocery.css'


type DeleteGroceryItemBtn = (groceryID: string) => React.MouseEventHandler<HTMLButtonElement>

const GoodToBuy = () => {
    const { goodToBuyGroceryList, deleteData } = UseGroceryData();
    if (!goodToBuyGroceryList) {
        return null; // or return an empty array: return [];
    }
    const deleteGroceryItemBtn: DeleteGroceryItemBtn = (groceryID) => (event) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this recipe?");
        // event.stopPropagation();
        if(isConfirmed){
            deleteData({groceryID: groceryID});
            // window.location.reload();
        }
    }
  
    return(
        <div className="goodToBuyList">
            <div className="ListByType">
                <label>Carbohydrates</label>
                {goodToBuyGroceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Carbohydrates))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Meat & Eggs</label>
                {goodToBuyGroceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.MeatEggs))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Bakery</label>
                {goodToBuyGroceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Bakery))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button className="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Frozen</label>
                {goodToBuyGroceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Frozen))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Fruits</label>
                {goodToBuyGroceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Fruits))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Vegetables</label>
                {goodToBuyGroceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Vegetables))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Beverage</label>
                {goodToBuyGroceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Beverage))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Household</label>
                {goodToBuyGroceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Household))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Pets</label>
                {goodToBuyGroceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Pets))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string)}>-</button></div>
                    </div>

                ))}
            </div>
            <div className="ListByType">
                <label>Others</label>
                {goodToBuyGroceryList
                    .filter((groceryItem) => (groceryItem.groceryItemType == GroceryType.Others))
                    .map((groceryItem) => (
                    <div className="goodToBuyGrocery" key = {groceryItem.groceryID}>
                        <div>{groceryItem.groceryItemName}</div>
                        <div><button id="removeGroceryItemBtn" onClick={deleteGroceryItemBtn(groceryItem.groceryID as string)}>-</button></div>
                    </div>

                ))}
            </div>
        </div>
    )

}

export default GoodToBuy;