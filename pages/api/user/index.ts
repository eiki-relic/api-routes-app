import { NextApiResponse, NextApiRequest } from 'next';
import { PrismaClient, User } from '@prisma/client';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
}
