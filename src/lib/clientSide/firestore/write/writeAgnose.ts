import { EnAgnoseType } from "../../../../types/enAgnoseType";
import { doc, getFirestore } from "@firebase/firestore";
import { WriteDoc } from "./writeDoc";

export const WriteAgnose = async (info: EnAgnoseType): Promise<void> => {
  const firestore = getFirestore();
  const ref = doc(firestore, `enAgnose/${info.id}`);
  return await WriteDoc(ref, info);
};
