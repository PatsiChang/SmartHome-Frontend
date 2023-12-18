import { useState } from "react";
import sashimiDemo from '../IMG/sashimiDemo.jpg'

const ImgSlider = () => {
    const slides = [
        {src: {sashimiDemo}, title: 'Sashimi'},
        // {url: '../IMG/sashimiDemo.jpg', title: 'Sashimi'},
        // {url: '../IMG/sashimiDemo.jpg', title: 'Sashimi'},
        // {url: '../IMG/sashimiDemo.jpg', title: 'Sashimi'},
        // {url: '../IMG/sashimiDemo.jpg', title: 'Sashimi'}
    ]

    const [currentIdx, setCurrentIdx] = useState(0);

    const sliderStyles = {
        height: '100%',
        position: 'relative'
    } as React.CSSProperties;

    const slideStyles = {
        width: '100vw',
        height: '100vh',
        borderRadius: '10',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIdx].src})`,
    } as React.CSSProperties;

    return(
        <div>
            <div style={sliderStyles}>
                <div style={slideStyles}></div>
            </div>
        </div>
    )
}

export default ImgSlider;