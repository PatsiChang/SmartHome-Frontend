import sashimiDemo from '../IMG/sashimiDemo.jpg'
import SpaghettiRecipeImg from '../IMG/SpaghettiRecipeImg.jpeg'
import Image from 'next/image';



const ImgSlider = () => {
    return(
        <main>
            <div className="row justify-content-center" style={{ marginTop: '1%', zIndex: 100}}>
                <div className="col-md-7">
                    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="10000">
                                    <Image src={sashimiDemo} className="d-block w-100" alt="SpaghettiRecipeImg"  />
                                </div>
                                <div className="carousel-item">
                                    <Image src={SpaghettiRecipeImg} className="d-block w-100" alt="SpaghettiRecipeImg" />
                                </div>
                                <div className="carousel-item">
                                    <Image src={sashimiDemo} className="d-block w-100" alt="SpaghettiRecipeImg" />
                                </div>
                            </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ImgSlider;