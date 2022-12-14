import { MovieInfoCard } from "@modules/MovieInfoCard/MovieInfoCard";
import { PersonCarousel } from "@modules/PersonCarousel/PersonCarousel";
import { getMovie } from "@services/tmdb";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function MoviePage({
  params,
}: {
  params: { movieId: string };
}) {
  const parseResult = z
    .object({ movieId: z.coerce.number().min(0).step(1) })
    .safeParse({ movieId: params.movieId });

  if (!parseResult.success) {
    notFound();
  }

  const movie = await getMovie({ id: parseResult.data.movieId });

  return (
    <div className="max-h-screen overflow-y-scroll flex flex-col">
      <MovieInfoCard media={movie} />
      <PersonCarousel collection={movie.credits?.cast || []} title="Cast" />
    </div>
  );
}
