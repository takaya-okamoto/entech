import { EnAgnoseType } from "../../../types/enAgnoseType";
import { doc, getFirestore, getDoc } from "@firebase/firestore";
import { ProfileType } from "../../../types/profileType";

export const fetchAgnose = async (
  id: string
): Promise<ProfileType | undefined> => {
  const firestore = getFirestore();
  const ref = doc(firestore, `enAgnose/${id}`);
  const snapshot = await getDoc(ref);
  return snapshot.exists()
    ? { ...(snapshot.data() as ProfileType) }
    : undefined;
};
