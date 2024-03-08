'use client'
import { ChangeEvent, FormEventHandler, useState } from "react"
import useRegisterPersonData from "../hooks/usePersonInfo"

export type Person = {
    userId: string,
    name: string,
    email: string,
    logInName: string,
    logInPasswordHashed: string,
}
const emptyPerson = {
    userId: "",
    name: "",
    email: "",
    logInName: "",
    logInPasswordHashed: "",
}

const Page = () => {
    const [person, setPerson] = useState<Person>(emptyPerson);
    const { postData } = useRegisterPersonData();

    const submitPersonForm: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        event.stopPropagation;
        console.log("Inside Submit")
        handlePersonlogInNameChange;
        console.log("Check submit Person Form Data", person);
        await postData({ person: person });
    }


    const handlePersonUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPerson({
            ...person,
            userId: e.target.value,
        })
    };
    const handlePersonNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPerson({
            ...person,
            name: e.target.value,
        })
    };
    const handlePersonEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPerson({
            ...person,
            email: e.target.value,
        })
    };
    const handlePersonlogInNameChange = () => {
        setPerson({
            ...person,
            logInName: person.userId,
        })
    };
    const handlePersonlogInPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPerson({
            ...person,
            logInPasswordHashed: e.target.value,
        })
    };


    return (
        <div id="logInPageContentContainer">
            <div id="loginLabel">
                Sign Up
            </div>
            <form onSubmit={submitPersonForm} id="LogInInput">
                <div className="form-floating mb-3" style={{ margin: "0% 10% 0% 10%" }}>
                    <input type="text" className="form-control" id="PersonUserID" name="PersonUserID"
                        onChange={handlePersonUserIdChange} value={person.userId} />
                    <label htmlFor="PersonUserID">userID:</label>
                </div>
                <div className="form-floating mb-3" style={{ margin: "0% 10% 0% 10%" }}>
                    <input type="text" className="form-control" id="PersonName" name="PersonName"
                        onChange={handlePersonNameChange}
                        value={person.name} />
                    <label htmlFor="PersonName">Name:</label>
                </div>
                <div className="form-floating mb-3" style={{ margin: "0% 10% 0% 10%" }}>
                    <input type="text" className="form-control" id="PersonEmail" name="PersonEmail"
                        onChange={handlePersonEmailChange}
                        value={person.email} />
                    <label htmlFor="PersonEmail">Email:</label>
                </div>
                <div className="form-floating mb-3" style={{ margin: "0% 10% 0% 10%" }}>
                    <input type="text" className="form-control" id="logInPassword" name="logInPassword"
                       onChange={handlePersonlogInPasswordChange} 
                       value={person.logInPasswordHashed}/>
                    <label htmlFor="logInPassword">Name:</label>
                </div>
                <div className="logInBtns">
                    <div><button id="PersonSignUpLogInBtn" type="submit">Sign Up</button></div>
                </div>
            </form>
        </div>

        /* <div id="personSignUpLabel">Sign Up</div>
            <div id="RegisterSignUpFlexContainer">
                <div className="registerSignUpItem">
                    <label htmlFor="PersonUserID">userID: </label>
                    <input type="text" className="personSignUpInputField" id="PersonUserID" name="PersonUserID" placeholder=" SpaceXGod"
                    onChange={handlePersonUserIdChange} 
                    value={person.userId}/>
                </div>
                <div className="registerSignUpItem">
                    <label htmlFor="PersonName">Name: </label>
                    <input type="text" className="personSignUpInputField" id="PersonName" name="PersonName" placeholder=" Elon Musk"
                    onChange={handlePersonNameChange} 
                    value={person.name}/>
                </div>
                <div className="registerSignUpItem">
                    <label htmlFor="PersonEmail">Email: </label>
                    <input type="text" className="personSignUpInputField" id="PersonEmail" name="PersonEmail" placeholder=" elonmusk@gmail.com"
                    onChange={handlePersonEmailChange} 
                    value={person.email}/>
                </div>
                <div className="registerSignUpItem">
                    <label htmlFor="logInPassword">Password: </label>
                    <input type="text" className="personSignUpInputField" id="logInPassword" name="logInPassword" placeholder=" *******"
                    onChange={handlePersonlogInPasswordChange} 
                    value={person.logInPasswordHashed}/>
                </div>
                <button id="PersonSignUpLogInBtn" type="submit">Sign Up</button>
            </div> */
    )
}

export default Page;