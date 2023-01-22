import { deleteDoc, doc, getFirestore } from "@firebase/firestore";

export const deletePost = async (postId: string) => {
  const firestore = getFirestore();
  const ref = doc(firestore, "post", `${postId}`);
  return await deleteDoc(ref);
};
