import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../../../stores/firebase/firebase";

export const UploadImage = async (path: string, url: string) => {
  const urlInst = new URL(url);
  if (urlInst.protocol === "blob:") {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const mountainsRef = ref(storage, path);
    const res = await fetch(url);
    const blob = await res.blob();
    await uploadBytes(mountainsRef, blob);
    return await getDownloadURL(mountainsRef);
  } else {
    return url;
  }
};
