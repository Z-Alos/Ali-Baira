import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA-_xs4E1fmTSM0EFSCAqwkc2QJ4m1p1QQ",
  authDomain: "nazmul-fc752.firebaseapp.com",
  projectId: "nazmul-fc752",
  storageBucket: "nazmul-fc752.appspot.com",
  messagingSenderId: "499320176496",
  appId: "1:499320176496:web:34bd502093acb3a26b19b5"
};
  
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
      console.log("successful!!!")
    }catch(error){
      console.log("error: ",error)
    }
  }
}

export const auth = getAuth(app);
export const storage = getStorage(app);



export const signInWithGoogleRedirect = () => signInWithPopup(auth, provider);

export default app;