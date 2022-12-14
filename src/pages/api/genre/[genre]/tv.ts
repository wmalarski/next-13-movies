import { getGenreList, getMediaByGenre } from "@services/tmdb";
import { paths } from "@utils/paths";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export const onGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const rawPage = req.query.page || "1";
  const parseResult = z
    .object({
      genreId: z.coerce.number().min(0).step(1),
      page: z.coerce.number().min(1).step(1),
    })
    .safeParse({ genreId: req.query.genreId, page: +rawPage });

  if (!parseResult.success) {
    return res.redirect(301, paths.notFound);
  }

  const [tvShows, genres] = await Promise.all([
    getMediaByGenre({
      genre: parseResult.data.genreId,
      media: "tv",
      page: parseResult.data.page,
    }),
    getGenreList({ media: "tv" }),
  ]);

  const genre = genres.find((genre) => genre.id === parseResult.data.genreId);

  return { genre, tvShows };
};
