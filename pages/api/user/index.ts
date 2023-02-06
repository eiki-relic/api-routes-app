import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient, User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | User | { message: string }>
) {
  const prisma = new PrismaClient();
  if (req.method === "POST") {
    const user = await prisma.user.create({
      data: req.body,
    });
    if (!user) return res.status(500).json({ message: "Create User Failed" });
    return res.status(200).json(user);
  }
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
}
