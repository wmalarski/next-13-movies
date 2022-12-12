import { $, Resource, useContext, useStore } from "@builder.io/qwik";
import { DocumentHead, useEndpoint, useLocation } from "@builder.io/qwik-city";
import { MediaGrid } from "@modules/MediaGrid/MediaGrid";
import { getTrendingTv, getTvShows } from "@services/tmdb";
import type { inferPromise, ProductionMedia } from "@services/types";
import { getListItem } from "@utils/format";
import { paths } from "@utils/paths";
import { z } from "zod";
import { ContainerContext } from "~/routes/context";

export default function CategoryPage() {
  const parseResult = z
    .object({ name: z.string().min(1) })
    .safeParse({ ...event.params });

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  const name = parseResult.data.name;

  try {
    const movies =
      name === "trending"
        ? await getTrendingTv({ page: 1 })
        : await getTvShows({ page: 1, query: name });
  } catch {
    throw event.response.redirect(paths.notFound);
  }
  const location = useLocation();

  const container = useContext(ContainerContext);

  const fetcher$ = $(
    async (page: number): Promise<inferPromise<typeof onGet>> => {
      const params = new URLSearchParams({ page: String(page) });
      const url = `${location.href}/api?${params}`;
      const response = await fetch(url);
      return response.json();
    }
  );

  const resource = useEndpoint<inferPromise<typeof onGet>>();

  const store = useStore({
    currentPage: 1,
    results: [] as ProductionMedia[],
  });

  return (
    <div className="flex flex-col">
      <h1 className="px-8 pt-4 text-4xl">
        {getListItem({ query: location.params.name, type: "tv" })}
      </h1>
      <div>
        <Resource
          value={resource}
          onPending={() => <div className="h-screen" />}
          onRejected={(e) => (
            <div>
              Rejected
              <pre>{JSON.stringify(e, null, 2)}</pre>
            </div>
          )}
          onResolved={(data) => (
            <MediaGrid
              collection={[...(data.results || []), ...store.results]}
              currentPage={store.currentPage}
              pageCount={data.total_pages || 1}
              parentContainer={container.value}
              onMore$={async () => {
                const newResult = await fetcher$(store.currentPage + 1);
                const newMedia = newResult.results || [];
                store.currentPage = newResult.page || store.currentPage;
                store.results = [...store.results, ...newMedia];
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
