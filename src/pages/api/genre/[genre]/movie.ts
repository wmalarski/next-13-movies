import { getGenreList, getMediaByGenre } from "@services/tmdb";
import { paths } from "@utils/paths";
import { z } from "zod";

export const onGet = async (event: RequestEvent) => {
  const rawPage = event.url.searchParams.get("page") || "1";
  const parseResult = z
    .object({
      genreId: z.number().min(0).step(1),
      page: z.number().min(1).step(1),
    })
    .safeParse({ genreId: +event.params.genreId, page: +rawPage });

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  const [movies, genres] = await Promise.all([
    getMediaByGenre({
      genre: parseResult.data.genreId,
      media: "movie",
      page: parseResult.data.page,
    }),
    getGenreList({ media: "movie" }),
  ]);

  const genre = genres.find((genre) => genre.id === parseResult.data.genreId);

  return { genre, movies };
};
