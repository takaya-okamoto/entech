import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../../../stores/firebase/firebase";

export const UploadImage = async (file: File, uid: string) => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const mountainsRef = ref(storage, `/profiles/${uid}`);
  await uploadBytes(mountainsRef, file);
  return await getDownloadURL(mountainsRef);
};
