import { DocumentReference, setDoc, updateDoc } from "@firebase/firestore";
import { FirebaseError } from "@firebase/util";

export const WriteDoc = async (
  ref: DocumentReference<unknown>,
  data: Record<string, unknown>
) => {
  try {
    return await updateDoc(ref, data);
  } catch (e) {
    console.error(e);
    if (e instanceof FirebaseError) {
      if (e.code === "not-found") {
        return await setDoc(ref, data);
      } else {
        console.error(e);
      }
    } else {
      console.error(e);
    }
  }
  return;
};
