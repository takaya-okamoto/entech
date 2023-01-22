import { ProfileType } from "../../../../types/profileType";
import { doc, getFirestore } from "@firebase/firestore";
import { WriteDoc } from "./writeDoc";

export const WriteProfile = async (info: ProfileType): Promise<void> => {
  const firestore = getFirestore();
  const ref = doc(firestore, `profile/${info.id}`);
  return await WriteDoc(ref, info);
};
