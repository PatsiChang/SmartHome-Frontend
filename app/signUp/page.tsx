'use client'
import { ChangeEvent, FormEventHandler, useState } from "react"
import useRegisterPersonData from "../hooks/useRegisterPersonData"

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
    email:"",
    logInName:"",
    logInPasswordHashed:"",
}

const Page = () => {
    const [person, setPerson] = useState<Person>(emptyPerson);
    const {postData} = useRegisterPersonData();

    const submitPersonForm : FormEventHandler<HTMLFormElement> = async (event) => {
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
 

    return(
        <form id="RegisterSignUpContainer" onSubmit={submitPersonForm}>
            <div id="personSignUpLabel">Sign Up</div>
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
            </div>
        </form>
    )
}

export default Page;