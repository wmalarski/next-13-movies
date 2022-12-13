import { getGenreList, getMediaByGenre } from "@services/tmdb";
import { notFound } from "next/navigation";
import { z } from "zod";
import { MovieGenreGrid } from "./MovieGenreGrid/MovieGenreGrid";

export default async function MovieGenrePage({
  searchParams,
  params,
}: {
  params: { genreId: string };
  searchParams?: { page?: string };
}) {
  const parseResult = z
    .object({
      genreId: z.coerce.number().min(0).step(1),
      page: z.coerce.number().min(1).step(1),
    })
    .safeParse({ genreId: params.genreId, page: searchParams?.page });

  if (!parseResult.success) {
    notFound();
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

  return (
    <div className="flex flex-col">
      <h1 className="px-8 pt-4 text-4xl">{`Movie Genre: ${genre?.name}`}</h1>
      <MovieGenreGrid collection={movies} />
    </div>
  );
}
