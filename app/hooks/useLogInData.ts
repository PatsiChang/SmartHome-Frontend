import { useState } from "react";
import { Action } from "./hooks-utils";
import { UserLogin } from "../page";

type SuccessResponse<T> = { data: T; };
type FailedResponse = { error: string; }
//Get One User
type LoginSuccessResponse = SuccessResponse<LoginProps>;
type LoginResponse = LoginSuccessResponse | FailedResponse;
type LoginProps = {
  userId: string,
  passwordHashed: string,
}
const getRequestConfig = (action: Action) => <T>(userLogin: T) => {
  switch (action) {
    case "POST": {
      return {
        body: JSON.stringify(userLogin),
      }
    }
  }
}

const useLogInData = () => {

  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = (fetchInput: Parameters<typeof fetch>[0]) => (action: Action) => async <T>(input: T) => {
    try {
      setIsLoading(true);
      const response = await fetch(fetchInput, {
        method: action,
        headers: {
          "Content-Type": "application/json"
        },
        ...getRequestConfig(action)(input)
      });
      const loginResponse = await response.text(); // Read response as text
      if (loginResponse.includes("error")) {
        throw new Error(loginResponse);
      }
      setToken(loginResponse);
      
      // setTokenInRecipeHook(loginResponse);
      return loginResponse;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  }

const postData = fetchData(process.env.NEXT_PUBLIC_API_URL1 + "/login")("POST");
// const getData = fetchData(process.env.NEXT_PUBLIC_API_URL1 + "/socialMedia")("GET")
  return { token, postData, setToken };
}

export default useLogInData;