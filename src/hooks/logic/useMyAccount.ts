import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { useFirebase } from "./useFirebase";
import { useState } from "react";

type MyAccountType = {
  user: User | null;
};

export const useMyAccount = (): MyAccountType => {
  const { app } = useFirebase();
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  onAuthStateChanged(auth, (u) => setUser(u));

  return { user };
};
