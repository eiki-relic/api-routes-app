import { NextApiResponse, NextApiRequest } from "next";
import { books, Book } from "../../../constants/books";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Book[] | { message: string }>
) {
  if (req.method === "POST") {
    console.log(req.body);
    return res.status(200).json({ message: "POST REQUEST SUCCEEDED" });
  }
  return res.status(200).json(books);
}
