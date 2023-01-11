import { getDatabase, ref, set } from "@firebase/database";
import { MessageType } from "../../../types/messageType";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../../../stores/firebase/firebase";

export const sendMessage = async (
  chatId: string,
  message: MessageType
): Promise<void> => {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(
    app,
    "https://gcc2022-3-default-rtdb.asia-southeast1.firebasedatabase.app"
  );
  const messageId = Date.now();
  const dbRef = ref(db, `/chat/${chatId}/${messageId}`);
  return await set(dbRef, message);
};
