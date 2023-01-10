import { FirebaseApp, initializeApp } from "@firebase/app";
import { firebaseConfig } from "../../stores/firebase/firebase";

type FirestoreType = {
  app: FirebaseApp | undefined;
};

export const useFirebase = (): FirestoreType => {
  const app = initializeApp(firebaseConfig);
  return { app };
};
