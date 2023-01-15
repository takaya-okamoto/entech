import { PostType } from "../../../types/postType";
import { doc, getFirestore } from "@firebase/firestore";
import { WriteDoc } from "./writeDoc";

export const WritePost = async (info: PostType): Promise<void> => {
  const firestore = getFirestore();
  const ref = doc(firestore, `post/${info.postId}`);
  return await WriteDoc(ref, info);
};
