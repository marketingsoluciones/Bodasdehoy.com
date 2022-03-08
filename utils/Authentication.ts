import { signOut, User } from "@firebase/auth";
import { auth, firebaseClient } from "../firebase";
import { UserMax } from "../context/AuthContext";

export const autenticacion = {
  SignOut: async (): Promise<Partial<UserMax | null>> => {
    await signOut(auth);
    return null;
  },
};
