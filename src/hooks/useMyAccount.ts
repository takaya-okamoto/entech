import { app } from "../stores/firebase/firebase";
import { getAuth, User } from "@firebase/auth";

type MyAccountType = {
  user: User | null;
};

export const useMyAccount = (): MyAccountType => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  return { user };
};
