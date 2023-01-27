import { EnAgnoseType } from "../../../../types/enAgnoseType";
import {
  doc,
  getFirestore,
  getDoc,
  query,
  where,
  collection,
  getDocs,
} from "@firebase/firestore";
import { ProfileType } from "../../../../types/profileType";

export const fetchUsersWhoAppliesToRequirementSkills = async (
  skills: { name: string }[] | undefined
): Promise<ProfileType[] | undefined> => {
  const firestore = getFirestore();
  const ref = collection(firestore, `profile`);
  const q = query(
    ref,
    where("requirementSkills", "array-contains-any", skills)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    return { ...(doc.data() as ProfileType) };
  });
};
