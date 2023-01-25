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
  const { title } = query;
  const filtered = books.find((book) => book.title === title);

  // User with id exists
  return filtered
    ? res.status(200).json(filtered)
    : res.status(404).json({ message: `${title} not found.` });
}
