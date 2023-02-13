import { NextApiResponse, NextApiRequest } from 'next';
import { PrismaClient, User } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { message: string }>
) {
  const prisma = new PrismaClient();
  console.log(1, req);
  const user = await prisma.user.findFirst({
    where: {
      id: +req.query.id,
    },
  });
  return res.status(200).json(user);
}
