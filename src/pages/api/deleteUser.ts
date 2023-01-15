import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";

const api = async (
  res: NextApiResponse,
  req: NextApiRequest
): Promise<void> => {
  const uid = req.body;
  if (typeof uid === "string") {
    await getAuth().deleteUser(uid);
    return res.status(200).send("delete user");
  } else {
    return;
  }
};
export default api;
