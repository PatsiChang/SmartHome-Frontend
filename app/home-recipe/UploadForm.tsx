 'use client'
 
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import server_url from '../../next.config'
import RegisterRecipe from "./RegisterRecipe";

export type UploadFormFile = {
    file: File,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
};

export type UploadFormError = {
    error: string,
    setError: React.Dispatch<React.SetStateAction<string | null>>
};

export type UploadFormState = UploadFormFile & UploadFormError;


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
            // setFile(selected);
            // fetch(server_url + "/recipe")
            // .then(response => response.json())
            // .then(res => console.log(res))
            setError('');
        }else {
            setFile(null);
            setError('Not an image file (png or jpeg)');
        }

        console.log(selected);
    }

    return(
        <form>
            <label id="uploadFormLabel">
                <input type="file" onChange={changeHandler} />
                <span id="plusSign"> +</span>
            </label>
            
            <div className="output">
                { error && <div className="error">{ error }</div> }
                { file && <ProgressBar file={file} setFile={setFile}/> }
            </div>
        
           
        </form>
    )
 }

 export default UploadForm;