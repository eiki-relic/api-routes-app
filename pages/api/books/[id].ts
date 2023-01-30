import { NextApiRequest, NextApiResponse } from "next";
import { books, Book } from '../../../constants/books'

type ResponseError = {
  message: string;
};

export default function booksHandler(
  req: NextApiRequest,
  res: NextApiResponse<Book | ResponseError>
) {
  const { query } = req;
  const { id } = query;
  const filtered = books.find((book) => book.id === +id);

  // User with id exists
  return filtered
    ? res.status(200).json(filtered)
    : res.status(404).json({ message: `${id} not found.` });
}
