import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { PostType } from "../../../types/postType";

export const fetchAllPost = async () => {
  const firestore = getFirestore();
  const ref = collection(firestore, "post");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => {
    return { ...(doc.data() as PostType) };
  });
};
