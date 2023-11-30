//Hooks make codes more reusable 
import { useState, useEffect } from 'react';
import { projectFireStore , getCollection} from '../firebase/config';
import { DocumentData, QuerySnapshot, collection, onSnapshot } from 'firebase/firestore';
import { DataSnapshot } from 'firebase/database';
import { error } from 'console';

type Collection = typeof collection;

const useFireStore = (path = 'image') => {
    const [docs, setDocs] = useState([]);

    // useEffect(() => {
    //     //onSnapshot fires a callback everytime collection changes
    //     const collectionRef = getCollection(path);
    //     const unsub = collection(collection)
    //         .orderBy('createdAt', 'desc')
            
    //     onSnapshot(collectionRef, (snapshot) => {
    //         let documents: QuerySnapshot<DocumentData, DocumentData>[] = [];
    //         snapshot.forEach((doc) => {
    //             documents.push({...doc.data(), id: doc.id})
    //         });
    //         setDocs(documents);
    //     })
    // }, [path])
    // return { docs };

}