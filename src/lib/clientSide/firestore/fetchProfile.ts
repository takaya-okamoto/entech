import { doc, getDoc, getFirestore } from "@firebase/firestore";
import { ProfileType } from "../../../types/profileType";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../../../stores/firebase/firebase";

export const fetchProfile = async (
  id: string
): Promise<ProfileType | undefined> => {
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const ref = doc(firestore, `profile/${id}`);
  const snapshot = await getDoc(ref);
  return snapshot.exists()
    ? { ...(snapshot.data() as ProfileType) }
    : undefined;
};
