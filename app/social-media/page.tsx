'use client'
import { getSocialMediaImages } from "../home-recipe/utils";
import { useRouter } from 'next/navigation';
import HomeRecipeNavBar from "../navbar/page";
import { useContext } from "react";
import { DataContext } from "../providers";
import { ReceipeData, RecipeCategories } from "../types/recipeTypes";
import { AccountStatus, AccountType, SocialMediaUser } from "../types/socialMediaTypes";

export const defaultUser: SocialMediaUser = {
    uid: "",
    userName: "",
    userNameChangeCount: 2,
    displayName: "",
    email: "",
    profilePicture: "",
    bannerPicture: "",
    accountStatus: AccountStatus.Active,
    accountType: AccountType.publicAccount,
    biography: "",
    followersCount: 0,
    followingCount: 0,
    displayedRecipes: Array<ReceipeData>(),
    showcasedRecipes: Array<ReceipeData>(),
    savedRecipes: Array<ReceipeData>(),
    userInterest: Array<RecipeCategories>()
}

const SocialMediaPage = () => {
    const dataContext = useContext(DataContext);
    if (!dataContext) { return null; }
    const { socialMediaUser } = dataContext;

    const router = useRouter();
    const directToEditProfilePage = (link: string) => {
        router.push(link);
    }

    return (
        <main>
            <div className='homeRecipe'>
                <div><HomeRecipeNavBar /></div>
            </div>
            <div className="container-sm">
                <section className="h-100 gradient-custom-2">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-9 col-xl-7">
                                <div className="card">
                                    <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: "#000", height: "200px" }}>
                                        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                            <img src={getSocialMediaImages(socialMediaUser?.profilePicture)}
                                                alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                                                style={{ minHeight: '150px', width: '150px', zIndex: 1, objectFit: "cover" }} />
                                            <button onClick={() => directToEditProfilePage("/editSocialMediaprofile")} className="btn btn-outline-dark"
                                                data-mdb-ripple-color="dark" style={{ zIndex: 1 }}
                                                disabled={socialMediaUser === null || socialMediaUser === undefined}> Edit profile</button>
                                        </div>
                                        <div className="ms-3" style={{ marginTop: '130px' }}>
                                            <h5>{socialMediaUser?.displayName ?? "Guest"}</h5>
                                        </div>
                                    </div>
                                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                        <div className="d-flex justify-content-end text-center py-1">
                                            <div className="px-3">
                                                <p className="mb-1 h5">{socialMediaUser?.displayedRecipes?.length ?? 0}</p>
                                                <p className="small text-muted mb-0">Recipes</p>
                                            </div>
                                            <div className="px-3">
                                                <p className="mb-1 h5">{socialMediaUser?.followersCount ?? 0}</p>
                                                <p className="small text-muted mb-0">Followers</p>
                                            </div>
                                            <div>
                                                <p className="mb-1 h5">{socialMediaUser?.followersCount ?? 0}</p>
                                                <p className="small text-muted mb-0">Following</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="p-4" style={{ backgroundColor: "#f8f9fa;" }}>
                                            <p className="font-italic mb-1">{socialMediaUser?.biography ?? ""}</p>
                                            <p className="font-italic mb-1">{socialMediaUser?.email ?? ""}</p>
                                        </div>
                                    </div>
                                    <div className="card-body p-4 text-black">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <p className="lead fw-normal mb-0">Recipes</p>
                                        </div>
                                        <div className="row g-2">
                                            <div className="col mb-2">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                                    alt="image 1" className="w-100 rounded-3" />
                                            </div>
                                            <div className="col mb-2">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                                    alt="image 2" className="w-100 rounded-3" />
                                            </div>
                                        </div>
                                        <div className="row g-2">
                                            <div className="col">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                                    alt="image 3" className="w-100 rounded-3" />
                                            </div>
                                            <div className="col">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                                    alt="image 4" className="w-100 rounded-3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default SocialMediaPage;