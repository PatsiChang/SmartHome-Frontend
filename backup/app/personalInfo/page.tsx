import { useState } from "react";
import HomeRecipeNavBar from "../navbar/page";
import './personalInfo.css'
import { Person } from "../hooks/usePersonInfo";


const page = (person: Person) => {

return (
    <main>
        <div><HomeRecipeNavBar /></div>
        <div id="personalInfoContainer">
            <div>Your Profile</div>
            <div id="personalInfoFlex">
                <ul>UserID:</ul>
                <input type="text" value={person.userId}></input>
                <ul>Name:</ul>
                <input type="text" value={person.name}></input>
                <ul>Email:</ul>
                <input type="text" value={person.email}></input>
                <ul>Password:</ul>
                <input type="text" value={person.logInPasswordHashed}></input>
                <div id="personalInfoSaveBtn"><button>Save</button></div>
            </div>
        </div>
    </main>
)
}

export default page;