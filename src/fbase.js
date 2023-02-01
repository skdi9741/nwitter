import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
    getFirestore, 
    addDoc, 
    collection, 
    getDocs, 
    getDoc, 
    query, 
    onSnapshot,
    orderBy,
    where,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dbService = getFirestore();
export const dbAddDoc = addDoc;
export const dbCollection = collection;
export const dbGetDoc = getDoc;
export const dbGetDocs = getDocs;
export const dbQuery = query;
export const dbOnSnapShot = onSnapshot;
export const dbWhere = where;
export const dbOrderBy = orderBy;
export const dbDeleteDoc = deleteDoc;
export const dbDoc = doc;
export const dbUpdateDoc = updateDoc;
export const storageService = getStorage();
