import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient, User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { message: string }>
) {
  const prisma = new PrismaClient();
  // console.log(1, req.query);

  if (req.method === "GET") {
    const user = await prisma.user.findFirst({
      where: {
        id: +req.query.id,
      },
    });
    return res.status(200).json(user);
  }

  if (req.method === "PUT") {
    console.log("put", req.query);
    const updateUser = await prisma.user.update({
      where: {
        id: +req.query.id,
      },
      data: {
        email: req.body.email,
        name: req.body.name,
      },
    });
    return res.status(200).json(updateUser);
  }

  if (req.method === "DELETE") {
    const deleteUser = await prisma.user.delete({
      where: {
        id: +req.query.id,
      },
    });
    return res.status(200).json(deleteUser);
  }
}
