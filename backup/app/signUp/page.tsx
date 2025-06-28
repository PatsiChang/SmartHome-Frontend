'use client'
import { ChangeEvent, FormEventHandler, useState } from "react"
import useRegisterPersonData, { Person } from "../hooks/usePersonInfo"


const emptyPerson = {
    userId: "",
    name: "",
    email: "",
    password: "",
}

const Page = () => {
    const [person, setPerson] = useState<Person>(emptyPerson);
    const { postData } = useRegisterPersonData();

    const submitPersonForm: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        event.stopPropagation;
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
    const handlePersonlogInPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPerson({
            ...person,
            password: e.target.value,
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
                        value={person.password} />
                    <label htmlFor="logInPassword">Name:</label>
                </div>
                <div className="logInBtns">
                    <div><button id="PersonSignUpLogInBtn" type="submit">Sign Up</button></div>
                </div>
            </form>
        </div>


    )
}

export default Page;