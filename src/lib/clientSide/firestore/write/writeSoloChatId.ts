import { addDoc, collection, getFirestore } from "@firebase/firestore";
import { SoloChatIdType } from "../../../../types/soloChatIdType";

export const writeSoloChatId = async (info: SoloChatIdType) => {
  const firestore = getFirestore();
  const ref = collection(firestore, "soloChat");
  return await addDoc(ref, info);
};
