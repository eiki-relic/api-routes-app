import { NextApiRequest, NextApiResponse } from "next";
import { people } from "../../../data";
import { Person } from "../../../interfaces";

type ResponseError = {
  message: string;
};

export default function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<Person | ResponseError>
) {
  const { query } = req;
  const { id } = query;
  const filtered = people.find((p) => p.id === id);

  // User with id exists
  return filtered
    ? res.status(200).json(filtered)
    : res.status(404).json({ message: `User with id: ${id} not found.` });
}
