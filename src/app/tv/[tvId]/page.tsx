import { Footer } from "@modules/Footer/Footer";
import { MovieInfoCard } from "@modules/MovieInfoCard/MovieInfoCard";
import { PersonCarousel } from "@modules/PersonCarousel/PersonCarousel";
import { TvHero } from "@modules/TvHero/TvHero";
import { getTvShow } from "@services/tmdb";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function TvPage({ params }: { params: { tvId: string } }) {
  const parseResult = z
    .object({ tvId: z.number().min(0).step(1) })
    .safeParse({ tvId: params.tvId });

  if (!parseResult.success) {
    notFound();
  }

  const movie = await getTvShow({ id: parseResult.data.tvId });

  return (
    <div className="max-h-screen overflow-y-scroll flex flex-col">
      <TvHero media={movie} />
      <MovieInfoCard media={movie} />
      <PersonCarousel collection={movie?.credits?.cast || []} title="Cast" />
      <Footer />
    </div>
  );
}
