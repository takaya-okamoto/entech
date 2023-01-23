import { doc, getFirestore } from "@firebase/firestore";
import { WriteDoc } from "./writeDoc";
import { FollowType } from "../../../../types/followType";

type Props = {
  data: FollowType;
};

export const writeFollows = async (info: Props): Promise<void> => {
  const firestore = getFirestore();
  const ref = doc(firestore, `follows/${info.data.uid}`);
  return await WriteDoc(ref, info.data);
};
