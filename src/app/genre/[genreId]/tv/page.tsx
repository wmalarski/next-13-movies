import { getGenreList, getMediaByGenre } from "@services/tmdb";
import { notFound } from "next/navigation";
import { z } from "zod";
import { TvGenreGrid } from "./TvGenreGrid/TvGenreGrid";

export default async function TvGenrePage({
  params,
}: {
  params: { genreId: string };
}) {
  const parseResult = z
    .object({ genreId: z.coerce.number().min(0).step(1) })
    .safeParse(params);

  if (!parseResult.success) {
    notFound();
  }

  const [tvShows, genres] = await Promise.all([
    getMediaByGenre({
      genre: parseResult.data.genreId,
      media: "tv",
      page: 1,
    }),
    getGenreList({ media: "tv" }),
  ]);

  const genre = genres.find((genre) => genre.id === parseResult.data.genreId);

  return (
    <div className="max-h-screen overflow-y-scroll flex flex-col gap-4">
      <h1 className="px-8 pt-4 text-4xl">{`Tv Show Genre: ${genre?.name}`}</h1>
      <TvGenreGrid collection={tvShows} />
    </div>
  );
}
