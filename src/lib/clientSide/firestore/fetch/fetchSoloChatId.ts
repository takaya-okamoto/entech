import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "@firebase/firestore";
import { SoloChatIdType } from "../../../../types/soloChatIdType";

export const fetchSoloChatId = async (
  info: Omit<SoloChatIdType, "chatId">
): Promise<SoloChatIdType> => {
  const firestore = getFirestore();
  const ref = collection(firestore, "soloChat");
  const q = query(
    ref,
    where("uid", "==", info.uid),
    where("sendUid", "==", info.sendUid)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    return { ...(doc.data() as SoloChatIdType) };
  })[0];
};
