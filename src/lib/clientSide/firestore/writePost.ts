import { PostType } from "../../../types/postType";
import { doc, getFirestore } from "@firebase/firestore";
import { WriteDoc } from "./writeDoc";

export const WritePost = async (info: PostType): Promise<void> => {
  const firestore = getFirestore();
  const path = info.postId;
  const ref = doc(firestore, `post/${path}`);
  return await WriteDoc(ref, info);
};
