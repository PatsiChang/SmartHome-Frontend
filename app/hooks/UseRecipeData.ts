import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, RecipeTypes } from '../home-recipe/RegisterRecipe';
import { Ingredient } from '../home-recipe/IngredientList';
import useLogInData from './useLogInData';

export type ReceipeData = {
  recipeID?: string;
  recipeName: string;
  type: RecipeTypes;
  ingredient: Ingredient[];
  steps: string[];
  imgURL?: string;
};
// type Props = {
//   recipeName?: string,
//   form?: Form,
//   recipeIcon?: File | Blob,
//   recipeIDTMP?: string | null,
// }
type SuccessResponse = ReceipeData[];
type FailedResponse = { error: string; }
type RecipeResponse = SuccessResponse | FailedResponse;
export type Action = "POST" | "GET" | "PUT" | "DELETE";
export const getRequestConfig = (action: Action) => <T>(token: T) => {
  switch (action) {
    case "POST": {
      return { body: token }
    }
    case "GET": {
      return {}
    }
    case "PUT": {
      return { body: JSON.stringify(token) }
    }
    case "DELETE": {
      return { body: JSON.stringify(token) }
    }
    default:
      throw Error(`Unsupport method : ${action}`)
  }
}
const useRecipeData = () => {
  const [recipeList, setRecipeList] = useState<Array<ReceipeData>>([]);
  const [currentRandomRecipe, setCurrentRandomRecipe] = useState<ReceipeData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [tokenInRecipeHook, setTokenInRecipeHook] = useState<string>("");

  // const { token } = useLogInData();
  //  Convert the format of the data received from the server to frontend
  // const convertResponseToRecipeList = (response: RecipeSuccessResponse) => {
  //   return response.map(recipe => ({ id: duty.id, name: duty.name }));
  // };

  const fetchData = (fetchInput: Parameters<typeof fetch>[0]) => (action: Action) => async (input: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(fetchInput, {
        method: action,
        headers: {
          "Content-Type": "application/json"
        },
        ...getRequestConfig(action)(input)
      });
      const recipeListByToken: RecipeResponse = await response.json();
      if ("error" in recipeListByToken) {
        throw Error(recipeListByToken.error);
      }
      const data = recipeListByToken as ReceipeData[];
      console.log("Checl recipe hook data:", data)
      setRecipeList(data);
      return data;

    } catch (error) {
      console.log("error: ", error)
      return null;
    }
    //  finally {
    //   console.log("finally: ")
    //   setIsLoading(false);
    // }
  }


  const postData = fetchData(process.env.NEXT_PUBLIC_API_URL + "/recipe")("POST");
  const getData = fetchData(process.env.NEXT_PUBLIC_API_URL + "/recipe/getRecipeByToken")("POST");
  const getRandomRecipe = fetchData(process.env.NEXT_PUBLIC_API_URL + "/recipe/getRandomRecipe")("GET");
  const updateRecipeIcon = fetchData(process.env.NEXT_PUBLIC_API_URL + "/recipe")("PUT");
  const deleteData = fetchData(process.env.NEXT_PUBLIC_API_URL + "/recipe")("DELETE");

  return { recipeList, currentRandomRecipe, setCurrentRandomRecipe, fetchData, postData, getData, deleteData, updateRecipeIcon, getRandomRecipe }

}

export default useRecipeData;
