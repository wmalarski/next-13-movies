import { Footer } from "@modules/Footer/Footer";
import { MediaGrid } from "@modules/MediaGrid/MediaGrid";
import { PersonHero } from "@modules/PersonHero/PersonHero";
import { getPerson } from "@services/tmdb";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function PersonPage({
  params,
}: {
  params: { personId: string };
}) {
  const parseResult = z
    .object({ personId: z.number().min(0).step(1) })
    .safeParse({ personId: params.personId });

  if (!parseResult.success) {
    notFound();
  }

  const movie = await getPerson({ id: parseResult.data.personId });

  return (
    <div className="max-h-screen overflow-y-scroll flex flex-col">
      <PersonHero person={movie} />
      <MediaGrid
        collection={[
          ...(movie.combined_credits?.cast || []),
          ...(movie.combined_credits?.crew || []),
        ]}
        currentPage={1}
        pageCount={1}
      />
      <Footer />
    </div>
  );
}
