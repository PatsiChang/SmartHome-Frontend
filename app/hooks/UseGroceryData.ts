import { useEffect, useState } from "react";
import { GroceryItem } from "../grocery/CreateNewGroceryItem";


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
}

const useGroceryData = () => {

  const[goodToBuyGroceryList, setgoodToBuyGroceryList] = useState<Array<GroceryItem>>([]);

  const fetchData = (action: groceryRestfulType) => async ({groceryRegisterForm, groceryID}: UseGroceryProps) => {

    
    try {
      if(action === groceryRestfulType.GET) {
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
           
          
      }else if(action === groceryRestfulType.POST) {
          await fetch(process.env.NEXT_PUBLIC_API_URL + "/groceryItem", {
            method: 'POST',
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify(groceryRegisterForm)
          })
      }else if(action === groceryRestfulType.DELETE) {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/groceryItem", {
          method: 'DELETE',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(groceryID),
        })
        await getData({groceryID: "GetData"});
          
      }
    } catch (error) {
      console.error('Error:', error);
      setgoodToBuyGroceryList([]);
    }

  }
  const postData = fetchData(groceryRestfulType.POST);
  const getData = fetchData(groceryRestfulType.GET);
  const deleteData = fetchData(groceryRestfulType.DELETE);
  

    
    
    useEffect(() => {
      getData({groceryRegisterForm: undefined});
    }, []);
    return { goodToBuyGroceryList, fetchData, postData, getData, deleteData }
}

export default useGroceryData;
  