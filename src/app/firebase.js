import { initializeApp } from "firebase/app";
import { signInWithPopup } from "firebase/auth";
import { getAuth, GoogleAuthProvider,} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPvLy6PJ20ui_vwFgBI6pQE4iSppG549U",
  authDomain: "segasea-26b5a.firebaseapp.com",
  projectId: "segasea-26b5a",
  storageBucket: "segasea-26b5a.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("User info:", user); // 📌 cek apakah ada photoURL
    return user;
  } catch (error) {
    console.error(error);
  }
};