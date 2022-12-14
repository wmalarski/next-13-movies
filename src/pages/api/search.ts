import { search } from "@services/tmdb";
import { NextApiRequest, NextApiResponse } from "next";

export const onGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = (req.query.query as string) || "";
  const page = req.query.page || "1";

  if (!query) {
    return null;
  }

  const result = await search({ page: +page, query });

  return { query, result };
};
