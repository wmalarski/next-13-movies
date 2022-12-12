import { Resource } from "@builder.io/qwik";
import { DocumentHead, RequestEvent, useEndpoint } from "@builder.io/qwik-city";
import { MovieInfoCard } from "@modules/MovieInfoCard/MovieInfoCard";
import { PersonCarousel } from "@modules/PersonCarousel/PersonCarousel";
import { TvHero } from "@modules/TvHero/TvHero";
import type { inferPromise } from "@services/types";
import { paths } from "@utils/paths";
import { z } from "zod";

export const onGet = async (event: RequestEvent) => {
  const parseResult = z
    .object({ tvId: z.number().min(0).step(1) })
    .safeParse({ tvId: +event.params.tvId });

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  const { getTvShow } = await import("@services/tmdb");

  try {
    const movie = await getTvShow({ id: parseResult.data.tvId });
    return movie;
  } catch {
    throw event.response.redirect(paths.notFound);
  }
};

export default function TvPage() {
  const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    <Resource
      value={resource}
      onPending={() => <div className="h-screen" />}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <flex className="flex flex-col">
          <TvHero media={data} />
          <MovieInfoCard media={data} />
          <PersonCarousel collection={data?.credits?.cast || []} title="Cast" />
        </flex>
      )}
    />
  );
}

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
