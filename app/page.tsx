'use client'
import './globals.css'
import { FormEventHandler } from 'react';
import useLogInData from './hooks/useLogInData'

const Home = () => {

  const { postData } = useLogInData();

    const getFormValue = (formData: FormData) => (key: string) => {
        const field = formData.get(key);
        if (field === null || field === undefined || field === "") {
            return null;
        } 
        return field;
    };
  const validateLogIn : FormEventHandler<HTMLFormElement> = async (event) => {
    const formData = new FormData(event.currentTarget);
    const userId = getFormValue(formData)("loginNameField") as string;
    const passwordHashed = getFormValue(formData)("loginNameField") as string;
    event.preventDefault();
    await postData({userId: userId, passwordHashed: passwordHashed});
    // directToRecipeHome;
  }

  // const directToRecipeHome = () => {
  //   return(
  //     <a href='./home-recipe'></a>
  //   )
  // }

  return (
    <div id="logInPageContentContainer">
      <div id="loginLabel">
          LOG IN
      </div>
      <form onSubmit={validateLogIn}>
        <div id="LogInInput">
          <div className="registerSignUpItem">
            <label htmlFor="loginNameField">Log In Name </label>
            <input type="text" id="loginNameField" name="loginNameField" placeholder='Email/ userID' />
          </div>
          <div className="registerSignUpItem">
            <label htmlFor="loginPasswordField">Password </label>
            <input type="text" id="loginPasswordField" 
            name="loginPasswordField" placeholder='********'></input>
          </div>
          <button id="PersonSignUpLogInBtn" type='submit'>Log In</button>
        </div>
      </form>
    </div>
  )
}

export default Home;
