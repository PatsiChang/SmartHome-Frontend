import { useEffect, useState } from "react";
import { GroceryBuyState, GroceryItem } from "../grocery/CreateNewGroceryItem";


export enum groceryRestfulType {
    POST = "POST",
    PUT = "PUT",
    GET = "GET",
    DELETE = "DELETE",
}
type UseGroceryProps = {
    action? : groceryRestfulType,
    groceryRegisterForm? : GroceryItem,
    groceryID?: string
    groceryBuyState?: GroceryBuyState,
}

const useGroceryData = () => {

  const[goodToBuyGroceryList, setgoodToBuyGroceryList] = useState<Array<GroceryItem>>([]);
  const[mustBuyGroceryList, setMustBuyGroceryList] = useState<Array<GroceryItem>>([]);

  const fetchData = (action: groceryRestfulType) => async ({groceryRegisterForm, groceryID, groceryBuyState}: UseGroceryProps) => {

    
    try {
      if(action === groceryRestfulType.GET && groceryBuyState === GroceryBuyState.GoodToBuy) {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+ "/groceryItem", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          })
          if (response.ok){
            const data = await response.json();
            setgoodToBuyGroceryList(data);
            return goodToBuyGroceryList;
          }
           
          
      }else if(action === groceryRestfulType.GET && groceryBuyState === GroceryBuyState.MustBuy) {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+ "/groceryItem/groceryMustBuyItem", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          })
          if (response.ok){
            const data = await response.json();
            setMustBuyGroceryList(data);
            return mustBuyGroceryList;
          }
           
          
      }else if(action === groceryRestfulType.POST && groceryBuyState === GroceryBuyState.GoodToBuy) {
          await fetch(process.env.NEXT_PUBLIC_API_URL + "/groceryItem", {
            method: 'POST',
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify(groceryRegisterForm)
          })
      }else if(action === groceryRestfulType.POST && groceryBuyState === GroceryBuyState.MustBuy) {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/groceryItem/groceryMustBuyItem", {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(groceryRegisterForm)
        })
      }else if(action === groceryRestfulType.DELETE && groceryBuyState === GroceryBuyState.GoodToBuy) {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/groceryItem", {
          method: 'DELETE',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(groceryID),
        })
          
      }else if(action === groceryRestfulType.DELETE && groceryBuyState === GroceryBuyState.MustBuy) {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/groceryItem/groceryMustBuyItem", {
          method: 'DELETE',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(groceryID),
        })
          
      }
    } catch (error) {
      console.error('Error:', error);
      setgoodToBuyGroceryList([]);
    }

  }
  const postData = fetchData(groceryRestfulType.POST);
  const getData = fetchData(groceryRestfulType.GET);
  const deleteData = fetchData(groceryRestfulType.DELETE);
  
  const convertGroceryItemsToGroceryForm = (GroceryItemsLi: Array<GroceryItem>) => {

  }
    
    useEffect(() => {
      getData({groceryBuyState:GroceryBuyState.GoodToBuy});
      getData({groceryBuyState:GroceryBuyState.MustBuy});
    }, []);
    return { goodToBuyGroceryList, mustBuyGroceryList, fetchData, postData, getData, deleteData }
}

export default useGroceryData;
  