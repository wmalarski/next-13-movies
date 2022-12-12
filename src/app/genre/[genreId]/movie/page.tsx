import {
  $,
  Resource,
  useContext,
  useResource$,
  useStore,
} from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import { MediaGrid } from "@modules/MediaGrid/MediaGrid";
import { getGenreList, getMediaByGenre } from "@services/tmdb";
import type { inferPromise, ProductionMedia } from "@services/types";
import { z } from "zod";
import { ContainerContext } from "~/routes/context";

export default async function MovieGenrePage() {
  const rawPage = event.url.searchParams.get("page") || "1";
  const parseResult = z
    .object({
      genreId: z.number().min(0).step(1),
      page: z.number().min(1).step(1),
    })
    .safeParse({ genreId: +event.params.genreId, page: +rawPage });

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  const [movies, genres] = await Promise.all([
    getMediaByGenre({
      genre: parseResult.data.genreId,
      media: "movie",
      page: parseResult.data.page,
    }),
    getGenreList({ media: "movie" }),
  ]);

  const genre = genres.find((genre) => genre.id === parseResult.data.genreId);

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

  const resource = useResource$(() => fetcher$(1));

  const store = useStore({
    currentPage: 1,
    results: [] as ProductionMedia[],
  });

  return (
    <Resource
      value={resource}
      onPending={() => <div className="h-screen" />}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <div className="flex flex-col">
          <h1 className="px-8 pt-4 text-4xl">{`Movie Genre: ${data.genre?.name}`}</h1>
          <MediaGrid
            collection={[...(data.movies.results || []), ...store.results]}
            currentPage={store.currentPage}
            pageCount={data.movies?.total_pages || 1}
            parentContainer={container.value}
            onMore$={async () => {
              const newResult = await fetcher$(store.currentPage + 1);
              const newMedia = newResult.movies.results || [];
              store.currentPage = newResult.movies.page || store.currentPage;
              store.results = [...store.results, ...newMedia];
            }}
          />
        </div>
      )}
    />
  );
}

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
