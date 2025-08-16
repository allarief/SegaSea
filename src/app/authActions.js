import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

// Login pakai Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User info:", result.user);
    return result.user;
  } catch (error) {
    console.error("Login error:", error);
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logout sukses");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
