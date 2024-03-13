'use client'

import useSocialMediaData, { SocialMediaUser } from "@/app/hooks/useSocialMediaData";
import HomeRecipeNavBar from "../../home-recipe/NavBar";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { defaultUser } from "../page";
import { v4 as uuidv4 } from "uuid"
import Link from "next/link";
import { AccountType } from "@/app/Enum/enum";


const editProfile = () => {
    // const { postData, recipeList, updateRecipeIcon } = useRecipeData();

    const { postData, getData, socialMediaUser }  = useSocialMediaData();

    const [userFormData, setUserFormData] = useState<SocialMediaUser>(defaultUser);
    const [editProfileBtn, setEditProfileBtn] = useState<boolean>(true);

    useEffect(()=>{
        getData(null);
        if (socialMediaUser !== null && socialMediaUser !== undefined){
            console.log("socialMediaUser", socialMediaUser)
            setUserFormData(socialMediaUser);
        }else 
        setUserFormData(userFormData)
    }),[]

    const handleDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserFormData(prevState => {
            return {
                ...prevState,
                displayName: e.target.value,
            }
        })
    };
    const handleBiographyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserFormData(prevState => {
            return {
                ...prevState,
                biography: e.target.value,
            }
        })
    };
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserFormData(prevState => {
            return {
                ...prevState,
                email: e.target.value,
            }
        })
    };
    const handleAccountTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserFormData(prevState => {
            return {
                ...prevState,
                accountType: e.target.value as AccountType,
            }
        })
    };
    const createNewProfile: FormEventHandler<HTMLFormElement>  = async (event) => {
        postData(userFormData);
        event.preventDefault();
    }

    return (
        <main>
            <div className='homeRecipe'>
                <div><HomeRecipeNavBar /></div>
            </div>
            <div className="container-sm" style={{ color: 'var(--lighterColor)' }}>
                <h1 style={{ margin: "2% 0% 0% 0%" }}>Edit Profile</h1>
                <hr />
                <div className="row">
                    {/* Left column */}
                    <div className="col-md-3">
                        <div className="text-center">
                            <img src="//placehold.it/100" className="avatar img-circle" alt="avatar" />
                            <label className="form-label" htmlFor="customFile"></label>
                            <input type="file" className="form-control" id="customFile" />
                        </div>
                    </div>

                    {/* Edit form column */}
                    <div className="col-md-9 personal-info">
                        <h3>Personal info</h3>
                        <form className="form-horizontal" role="form" onSubmit={createNewProfile}>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Name:</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" id="displayName" name="displayName" onChange={handleDisplayNameChange}
                                    value={userFormData.displayName} placeholder="This will be your profile name" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Biography:</label>
                                <div className="col-lg-8">
                                <input className="form-control" type="text" name="biography" onChange={handleBiographyChange}
                                    value={userFormData.biography}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Email:</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" name="email" onChange={handleEmailChange}
                                    value={userFormData.email}/>
                                </div>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" 
                                onChange={handleAccountTypeChange} checked={userFormData.accountType === AccountType.privateAccount}/>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Private Account</label>
                            </div>
                            <div className="form-group">
                                <label className="col-md-3 control-label"></label>
                                <div className="col-md-8">
                                    <input type="submit" className="btn btn-primary" value="Save Changes" />
                                    <span></span>
                                    <Link href="/social-media" className="btn btn-default"
                                                data-mdb-ripple-color="dark" style={{ zIndex: 1 }}> Cancel</Link>
                                    {/* <input type="reset" className="btn btn-default" value="Cancel" /> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <hr />
            </div>
        </main>
    )
}

export default editProfile;