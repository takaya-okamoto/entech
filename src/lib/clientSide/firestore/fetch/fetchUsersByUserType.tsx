import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "@firebase/firestore";
import { ProfileType } from "../../../../types/profileType";

export const fetchUsersByUserType = async (
  type: "e" | "n"
): Promise<ProfileType[] | undefined> => {
  const firestore = getFirestore();
  const ref = collection(firestore, "profile");
  const q = query(ref, where("userType", "==", type));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    return { ...(doc.data() as ProfileType) };
  });
};
