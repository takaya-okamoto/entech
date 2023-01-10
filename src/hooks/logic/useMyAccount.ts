import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { useFirebase } from "./useFirebase";
import { useEffect, useState } from "react";
import { useIsMounted } from "./useIsMounted";

type MyAccountType = {
  user: User | null;
};

export const useMyAccount = (): MyAccountType => {
  const { app } = useFirebase();
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  const isMountedRef = useIsMounted();

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (isMountedRef.current) {
        setUser(u);
      }
    });
  }, [auth, isMountedRef]);

  return { user };
};
