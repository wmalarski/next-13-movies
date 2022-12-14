import { getTrendingTv, getTvShows } from "@services/tmdb";
import { paths } from "@utils/paths";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export const onGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const rawPage = req.query.page || "1";
  const parseResult = z
    .object({ name: z.string().min(1), page: z.number().min(1).step(1) })
    .safeParse({ ...req.query, page: +rawPage });

  if (!parseResult.success) {
    return res.redirect(301, paths.notFound);
  }

  const { page, name } = parseResult.data;

  try {
    const movies =
      name === "trending"
        ? await getTrendingTv({ page })
        : await getTvShows({ page, query: name });
    return movies;
  } catch {
    return res.redirect(301, paths.notFound);
  }
};
