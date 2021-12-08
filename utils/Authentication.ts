import { getAuth, signOut, User } from "@firebase/auth";
import { firebaseClient } from "../firebase";
import { UserMax } from "../context/AuthContext";
firebaseClient;
const auth = getAuth();

export const autenticacion = {
  SignOut: async (): Promise<Partial<UserMax | null>> => {
    await signOut(auth);
    return null;
  },
};
