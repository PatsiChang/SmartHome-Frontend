'use client'
import './globals.css'
import { FormEventHandler } from 'react';
import useLogInData from './hooks/useLogInData'
import { useRouter } from 'next/navigation';

const Home = () => {
  const { putData } = useLogInData();
  const router = useRouter();

  const getFormValue = (formData: FormData) => (key: string) => {
    const field = formData.get(key);
    if (field === null || field === undefined || field === "") {
      return null;
    }
    return field;
  };
  const validateLogIn: FormEventHandler<HTMLFormElement> = async (event) => {
    const formData = new FormData(event.currentTarget);
    const userId = getFormValue(formData)("loginNameField") as string;
    const passwordHashed = getFormValue(formData)("loginNameField") as string;
    event.preventDefault();
    await putData({ userId: userId, passwordHashed: passwordHashed });
    // directToRecipeHome;
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
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3" style={{ margin: "0% 10% 0% 10%" }}>
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="logInBtns">
            <div><button id="PersonSignUpLogInBtn" onClick={directToRecipeHome} type='submit'>Log In</button></div>
            <div><button id="PersonSignUpLogInBtn" onClick={directToSignUpPage} >Sign Up</button>
            </div>
          </div>
        </div>
      </form>
    </div>

  )
}

export default Home;
