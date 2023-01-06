import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { useFirestore } from "../view/useFirestore";
import { useState } from "react";

type MyAccountType = {
  user: User | null;
};

export const useMyAccount = (): MyAccountType => {
  const { app } = useFirestore();
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  onAuthStateChanged(auth, (u) => setUser(u));

  return { user };
};
