import { doc, getDoc, getFirestore } from "@firebase/firestore";
import { ProfileType } from "../../../../types/profileType";

export const fetchAllUser = async (
  id: string
): Promise<ProfileType | undefined> => {
  const firestore = getFirestore();
  const ref = doc(firestore, `profile/${id}`);
  const snapshot = await getDoc(ref);
  return snapshot.exists()
    ? { ...(snapshot.data() as ProfileType) }
    : undefined;
};
