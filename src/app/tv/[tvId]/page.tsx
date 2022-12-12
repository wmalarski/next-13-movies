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

  try {
    const movie = await getTvShow({ id: parseResult.data.tvId });
  } catch {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <TvHero media={data} />
      <MovieInfoCard media={data} />
      <PersonCarousel collection={data?.credits?.cast || []} title="Cast" />
    </div>
  );
}

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
