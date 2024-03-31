'use client'
import './globals.css'
import { ChangeEvent, FormEventHandler, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { DataContext } from './providers';

export type UserLogin = {
  userId: string,
  logInPasswordHashed: string,
}
const defaultUserLogin = {
  userId: "",
  logInPasswordHashed: "",
}
const Home = () => {
  //Allow All component to access the same state of the hook
  const dataContext = useContext(DataContext);
  if (!dataContext) { return null; }
  const { getRecipeData, postLoginData, getSocialMediaData } = dataContext;

  const router = useRouter();
  const [userLogin, setUserLogin] = useState<UserLogin>(defaultUserLogin);

  useEffect(() => {
    setUserLogin(userLogin)
  }), []

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserLogin(prevState => {
      return {
        ...prevState,
        userId: e.target.value,
      }
    })
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserLogin(prevState => {
      return {
        ...prevState,
        logInPasswordHashed: e.target.value,
      }
    })
  };
  const validateLogIn: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const token1 = await postLoginData(userLogin);

    if (token1 !== null && token1 !== undefined) {
      await getSocialMediaData(null);
      await getRecipeData(null);
      directToRecipeHome();
    }
    // event.preventDefault();
  }

  const directToRecipeHome = () => {
    router.push('./home-recipe')
  }
  const directToSignUpPage = () => {
    router.push('./signUp')
  }

  return (
    <div id="logInPageContentContainer">
      <div id="loginLabel">
        LOG IN
      </div>
      <form onSubmit={validateLogIn}>
        <div id="LogInInput">
          <div className="form-floating mb-3" style={{ margin: "0% 10% 0% 10%" }}>
            <input type="text" className="form-control" id="userId" name="userId"
              onChange={handleUserIdChange} value={userLogin.userId} />
            <label htmlFor="userId">Email address</label>
          </div>
          <div className="form-floating mb-3" style={{ margin: "0% 10% 0% 10%" }}>
            <input type="password" className="form-control" id="logInPasswordHashed" name="logInPasswordHashed"
              placeholder="Password" onChange={handlePasswordChange} value={userLogin.logInPasswordHashed} />
            <label htmlFor="passwordHashed">Password</label>
          </div>
          <div className="logInBtns">
            <div><button id="PersonSignUpLogInBtn" type='submit'>Log In</button></div>
            <div><button id="PersonSignUpLogInBtn" onClick={directToSignUpPage} >Sign Up</button>
            </div>
          </div>
        </div>
      </form>
    </div>

  )
}

export default Home;
