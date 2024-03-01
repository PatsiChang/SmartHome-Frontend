import { useState } from "react";
import HomeRecipeNavBar from "../home-recipe/NavBar";
import './personalInfo.css'
import { Person } from "../signUp/page";


const page = (person: Person) => {

return (
    <main>
        <div><HomeRecipeNavBar /></div>
        <div id="personalInfoContainer">
            <div>Your Profile</div>
            <div id="personalInfoFlex">
                <ul>UserID:</ul>
                <input type="text" value={person.logInName}></input>
                <ul>Name:</ul>
                <input type="text" value={person.logInName}></input>
                <ul>Email:</ul>
                <input type="text" value={person.logInName}></input>
                <ul>Password:</ul>
                <input type="text" value={person.logInName}></input>
                <div id="personalInfoSaveBtn"><button>Save</button></div>
            </div>
        </div>
    </main>
)
}

export default page;