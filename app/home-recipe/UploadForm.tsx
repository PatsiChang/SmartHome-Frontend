 'use client'
 
 import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

 const UploadForm = () => {

    //Store file in local state | Set initial file to null
    const[file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    //Restrict File Types
    const ImgTypes = ['image/png', 'image/jpeg']

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        let selected = e.target.files[0];
        if(selected && ImgTypes.includes(selected.type)){
            setFile(selected);
            setError('');
        }else {
            setFile(null);
            setError('Not an image file (png or jpeg)');
        }

        console.log(selected);
    }

    return(
        <form>
            <input type="file" onChange={changeHandler} />
            <div className="output">
                {/* Only if first param is true, thus second param */}
                { error && <div className="error">{ error}</div> }
                { file && <div>{ file.name}</div> }
                {/* { file && <ProgressBar /> } */}
            </div>
        </form>
    )
 }

 export default UploadForm;