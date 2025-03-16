import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../lib/auth";

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await auth();
  if (!session) {
    return res.status(401).end();
  }
  return res.status(200).json(session);
};
