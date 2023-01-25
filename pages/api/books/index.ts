import { NextApiResponse, NextApiRequest } from 'next'
import { books, Book } from '../../../constants/books'

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Book[]>
) {
  return res.status(200).json(books)
}
