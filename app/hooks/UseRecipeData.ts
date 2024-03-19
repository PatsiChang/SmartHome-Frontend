import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, RecipeTypes } from '../home-recipe/RegisterRecipe';
import { Ingredient } from '../home-recipe/IngredientList';
import useLogInData from './useLogInData';
import { getRequestConfig } from './hooks-utils';

export type ReceipeData = {
  recipeID?: string;
  recipeName: string;
  type: RecipeTypes;
  ingredient: Ingredient[];
  steps: string[];
  imgURL?: string;
};
type SuccessResponse = ReceipeData[];
type FailedResponse = { error: string; }
type RecipeResponse = SuccessResponse | FailedResponse;
export type Action = "POST" | "GET" | "PUT" | "DELETE";

const useRecipeData = () => {
  const [recipeList, setRecipeList] = useState<Array<ReceipeData>>([]);
  const [currentRandomRecipe, setCurrentRandomRecipe] = useState<ReceipeData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = (fetchInput: Parameters<typeof fetch>[0]) => (action: Action) => (token: string) =>
    async  <T>(input: T) => {
      console.log("token in recipe hook", token)
      try {
        setIsLoading(true);
        const response = await fetch(fetchInput, {
          method: action,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
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
