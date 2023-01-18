import { FollowType } from "../../../types/followType";
import { doc, getDoc, getFirestore } from "@firebase/firestore";

export const fetchFollows = async (
  id: string
): Promise<FollowType | undefined> => {
  const firestore = getFirestore();
  const ref = doc(firestore, `follows/${id}`);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? { ...(snapshot.data() as FollowType) } : undefined;
};
