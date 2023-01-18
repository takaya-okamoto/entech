import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "@firebase/firestore";
import { SoloChatIdType } from "../../../types/soloChatIdType";

type Props = {
  uid: string;
  path: string;
};

export const fetchChatUsers = async (
  info: Props
): Promise<SoloChatIdType[]> => {
  const firestore = getFirestore();
  const ref = collection(firestore, `soloChat`);
  const q = query(ref, where(info.path, "==", info.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    return { ...(doc.data() as SoloChatIdType) };
  });
};
