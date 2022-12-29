import { getMovies, getTrendingMovie } from "@services/tmdb";
import { paths } from "@utils/paths";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export const onGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const parseResult = z
    .object({
      name: z.string().min(1),
      page: z.coerce.number().min(1).step(1).optional().default(0),
    })
    .safeParse(req.query);

  if (!parseResult.success) {
    return res.redirect(301, paths.notFound);
  }

  const { page, name } = parseResult.data;

  try {
    const movies =
      name === "trending"
        ? await getTrendingMovie({ page })
        : await getMovies({ page, query: name });
    return movies;
  } catch {
    return res.redirect(301, paths.notFound);
  }
};
