'use client'

import HomeRecipeNavBar from "../../home-recipe/NavBar";


const editProfile = () => {

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
                        <form className="form-horizontal" role="form">
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Name:</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" value={""} placeholder="This will be your profile name" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Biography:</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" value={""} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Email:</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" value="" />
                                </div>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Private Account</label>
                            </div>
                            <div className="form-group">
                                <label className="col-md-3 control-label"></label>
                                <div className="col-md-8">
                                    <input type="button" className="btn btn-primary" value="Save Changes" />
                                    <span></span>
                                    <input type="reset" className="btn btn-default" value="Cancel" />
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