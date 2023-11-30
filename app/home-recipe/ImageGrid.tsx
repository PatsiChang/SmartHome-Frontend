'use client'
 
import React, { useEffect, useState } from "react";
import '../home-recipe/homeRecipe.css';
import server_url from '../../next.config'
import Image from 'next/image';
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const ImageGrid = () => {
    const [img, setImg] = useState<string | StaticImport>();
    const [error, setError] = useState<String|null>()

    const fetchImage = async () => {
        try {
            // const res = await fetch(server_url + "/recipe");
            // const imageBlob = await res.blob();
            // const imageObjectURL = URL.createObjectURL(imageBlob);
            // setImg(imageObjectURL);
        } catch (error) {
            setError("NoFile");
        }
        
      };
    
    useEffect(()=>{ fetchImage(); }, [])
    return(
        <div className="img-grid">
            <div className="img-wrap">
            
            <Image id="recipeImg" src={img!} alt="recipeImg"/>
            </div> 
        </div>
    )

}

export default ImageGrid;