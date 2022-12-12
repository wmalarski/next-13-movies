import { Resource } from "@builder.io/qwik";
import { DocumentHead, useEndpoint } from "@builder.io/qwik-city";
import { MovieInfoCard } from "@modules/MovieInfoCard/MovieInfoCard";
import { PersonCarousel } from "@modules/PersonCarousel/PersonCarousel";
import { TvHero } from "@modules/TvHero/TvHero";
import { getTvShow } from "@services/tmdb";
import type { inferPromise } from "@services/types";
import { paths } from "@utils/paths";
import { z } from "zod";

export default async function TvPage() {
  const parseResult = z
    .object({ tvId: z.number().min(0).step(1) })
    .safeParse({ tvId: +event.params.tvId });

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  try {
    const movie = await getTvShow({ id: parseResult.data.tvId });
  } catch {
    throw event.response.redirect(paths.notFound);
  }
  const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    <Resource
      value={resource}
      onPending={() => <div className="h-screen" />}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <div className="flex flex-col">
          <TvHero media={data} />
          <MovieInfoCard media={data} />
          <PersonCarousel collection={data?.credits?.cast || []} title="Cast" />
        </div>
      )}
    />
  );
}

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
