'use client'

import { SocialMediaUser } from "@/app/hooks/useSocialMediaData";
import HomeRecipeNavBar from "../navbar/page";
import { ChangeEvent, FormEventHandler, useContext, useEffect, useState } from "react";
import { defaultUser } from "../social-media/page";
import { AccountType } from "@/app/Enum/enum";
import { useRouter } from "next/navigation";
import { ImgDataContext, LoginDataContext, SocialMediaDataContext } from "../providers";
import { onchangeEvent } from "../home-recipe/RegisterRecipe";
import useImgData from "../hooks/useImgData";


const editSocialMediaprofile = () => {
    const router = useRouter();
    const directToEditProfilePage = (link: string) => {
        router.push(link);
    }
    const loginDataContext = useContext(LoginDataContext);
    if (!loginDataContext) {
        directToEditProfilePage("/");
        return null;
    }
    const imgDataContext = useContext(ImgDataContext);
    if (!imgDataContext) {
        return null;
    }
    const { updateProfilePictures } = imgDataContext
    const { token } = loginDataContext;

    const socialMediaDataContext = useContext(SocialMediaDataContext);
    if (!socialMediaDataContext) { return null; }
    const { postData, socialMediaUser } = socialMediaDataContext;

    const [userFormData, setUserFormData] = useState<SocialMediaUser>(defaultUser);
    // const [editProfileBtn, setEditProfileBtn] = useState<boolean>(true);
    const [profileImgState, setProfileImgState] = useState<string | null>("//placehold.it/100");
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [imgBytes, setImgBytes] = useState<File | null>(null);
    const ImgTypes = ['image/png', 'image/jpeg']
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // getSocialMediaUser(token);
        if (socialMediaUser !== null && socialMediaUser !== undefined) {
            setUserFormData(socialMediaUser);
        } else
            setUserFormData(userFormData)
    }, [])

    //Handle Images
    const changeHandler = (e: onchangeEvent) => {
        if (!e.target.files) return;
        let selected = e.target.files[0];
        if (selected && ImgTypes.includes(selected.type)) {
            setImgBytes(selected)
            setImgUrl(URL.createObjectURL(selected));
            setProfileImgState("Change Icon");
            setError('');
        } else {
            setError('Not an image file (png or jpeg)');
        }
    }

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

    const createNewProfile: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const imgURL = imgBytes as Blob;
        const formData = new FormData();
        formData.append("profilePicture", imgURL as Blob);
        const profilePictureID = await updateProfilePictures(formData);
        if (profilePictureID !== null && profilePictureID !== undefined) {
            console.log(profilePictureID)
            const editedFormValue: SocialMediaUser = {
                ...userFormData,
                profilePicture: profilePictureID,
            }
            postData(token)(editedFormValue);
        }
        directToEditProfilePage("/social-media")
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
                            <div className="output">
                                {imgUrl && <img id="recipeImg" src={imgUrl} />}
                                {error && <div className="error">{error}</div>}
                            </div>
                            <label className="form-label" htmlFor="customFile"></label>
                            <input type="file" className="form-control" id="customFile" onChange={changeHandler} />
                            <span id="addRecipeIcon"> {profileImgState} </span>
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
                                        value={userFormData.biography} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Email:</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" name="email" onChange={handleEmailChange}
                                        value={userFormData.email} />
                                </div>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                                    onChange={handleAccountTypeChange} checked={userFormData.accountType === AccountType.privateAccount} />
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Private Account</label>
                            </div>
                            <div className="form-group">
                                <label className="col-md-3 control-label"></label>
                                <div className="col-md-8">
                                    <input type="submit" className="btn btn-primary" value="Save Changes" />
                                    <span></span>
                                    <button onClick={() => directToEditProfilePage("/social-media")} className="btn btn-default"
                                        data-mdb-ripple-color="dark" style={{ zIndex: 1 }}> Cancel</button>
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

export default editSocialMediaprofile;