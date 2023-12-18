import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import '../home-recipe/homeRecipe.css';
import { UploadFormState, UploadFormError } from './RegisterRecipe';


type ProgressBarProps = {
    file: UploadFormState["file"];
    setFile: UploadFormState["setFile"];
};
type ProgressBarError = {
    error: UploadFormError["error"];
    setError: UploadFormError["setError"];
    
}

const ProgressBar = ({file, setFile} : ProgressBarProps) => {
    //useStorage will trigger useEffect in useStorage hook and return the url and progress
    const { url, progress } = useStorage(file);

    console.log("ProgressBar main", { url, progress, file } )
    useEffect(() => {
        console.log("ProgressBar useEffect", { url, progress, file } )
        if(url) {
            setFile(null);
        }
    }, [url, setFile])

    return(
        <div className='progress-bar' style={{ width: progress + '%'}}></div>
    );
    
}

export default ProgressBar;