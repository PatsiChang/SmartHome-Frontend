import * as firebase from 'firebase/app'
import { getStorage } from "firebase/storage";
import { getFirestore, collection } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGEIlNgt7mfOv5Cewhwj_0ynROH9myNeE",
  authDomain: "smarthome-d67d1.firebaseapp.com",
  projectId: "smarthome-d67d1",
  storageBucket: "smarthome-d67d1.appspot.com",
  messagingSenderId: "866195294520",
  appId: "1:866195294520:web:d57ecb890dbe70ab9f99cd"
};

  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const projectStorage = getStorage(app);
const projectFireStore = getFirestore(app);

const getCollection = (path: string) => {
  return collection(projectFireStore, path);
}

export {projectStorage, projectFireStore, getCollection};



