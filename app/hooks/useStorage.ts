import { useState, useEffect } from 'react';
import { projectStorage } from '../firebase/config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const useStorage = (file: File) => {
    //Progress of the Upload
    const [progress, setProgress] = useState(0);
    //Errors from the Upload
    const [error, setError] = useState<string| null>(null);
    //Url from image after Uploaded
    const [url, setUrl] = useState("");

    //Everytime there's changes in [file], useEffect runs
    useEffect(() => {
        //references
        const storageRef = ref(projectStorage, file.name);
 
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        const uploadTask = uploadBytesResumable(storageRef, file);
        // 1. 'state_changed' observer, called any time the state changes
        uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            setError(error.message);
        }, () => {
        // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setUrl(downloadURL);
        });
        }
        );

    }, [file]);

    return { progress, error, url }
}

export default useStorage;