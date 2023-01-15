import { PostType } from "../../../types/postType";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "@firebase/firestore";

export const fetchAllMyPost = async (id: string): Promise<PostType[]> => {
  const firestore = getFirestore();
  const ref = collection(firestore, "post");
  const q = query(ref, where("userId", "==", id));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    return { ...(doc.data() as PostType) };
  });
};
