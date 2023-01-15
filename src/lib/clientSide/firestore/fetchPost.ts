import { PostType } from "../../../types/postType";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../../../stores/firebase/firebase";
import { doc, getDoc, getFirestore } from "@firebase/firestore";

export const fetchPost = async (id: string): Promise<PostType | undefined> => {
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore();
  const ref = doc(firestore, `post/${id}`);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? { ...(snapshot.data() as PostType) } : undefined;
};
