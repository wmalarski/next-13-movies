import { DocumentHead } from "@builder.io/qwik-city";
import { MediaGrid } from "@modules/MediaGrid/MediaGrid";
import { PersonHero } from "@modules/PersonHero/PersonHero";
import { getPerson } from "@services/tmdb";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function PersonPage() {
  const parseResult = z
    .object({ personId: z.number().min(0).step(1) })
    .safeParse({ personId: +event.params.personId });

  if (!parseResult.success) {
    notFound();
  }

  try {
    const movie = await getPerson({ id: parseResult.data.personId });
  } catch {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <PersonHero person={data} />
      <MediaGrid
        collection={[
          ...(data.combined_credits?.cast || []),
          ...(data.combined_credits?.crew || []),
        ]}
        currentPage={1}
        pageCount={1}
      />
    </div>
  );
}

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
