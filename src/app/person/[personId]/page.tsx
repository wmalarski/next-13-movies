import { Resource } from "@builder.io/qwik";
import { DocumentHead, RequestEvent, useEndpoint } from "@builder.io/qwik-city";
import { MediaGrid } from "@modules/MediaGrid/MediaGrid";
import { PersonHero } from "@modules/PersonHero/PersonHero";
import type { inferPromise } from "@services/types";
import { paths } from "@utils/paths";
import { z } from "zod";

export const onGet = async (event: RequestEvent) => {
  const parseResult = z
    .object({ personId: z.number().min(0).step(1) })
    .safeParse({ personId: +event.params.personId });

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  const { getPerson } = await import("@services/tmdb");

  try {
    const movie = await getPerson({ id: parseResult.data.personId });
    return movie;
  } catch {
    throw event.response.redirect(paths.notFound);
  }
};

export default () => {
  const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    <Resource
      value={resource}
      onPending={() => <div className="h-screen" />}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <div style="flex flex-col">
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
      )}
    />
  );
};

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
