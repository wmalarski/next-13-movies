import { $, useContext, useStore } from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import { MediaGrid } from "@modules/MediaGrid/MediaGrid";
import { getGenreList, getMediaByGenre } from "@services/tmdb";
import type { inferPromise, ProductionMedia } from "@services/types";
import { notFound } from "next/navigation";
import { z } from "zod";
import { ContainerContext } from "~/routes/context";

export default async function MovieGenrePage({
  searchParams,
  params,
}: {
  params: { genreId: string };
  searchParams?: { page?: string };
}) {
  const parseResult = z
    .object({
      genreId: z.coerce.number().min(0).step(1),
      page: z.coerce.number().min(1).step(1),
    })
    .safeParse({ genreId: params.genreId, page: searchParams?.page });

  if (!parseResult.success) {
    notFound();
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

  const store = useStore({
    currentPage: 1,
    results: [] as ProductionMedia[],
  });

  return (
    <div className="flex flex-col">
      <h1 className="px-8 pt-4 text-4xl">{`Movie Genre: ${genre?.name}`}</h1>
      <MediaGrid
        collection={[...(movies.results || []), ...store.results]}
        currentPage={store.currentPage}
        pageCount={movies?.total_pages || 1}
        parentContainer={container.value}
        onMore$={async () => {
          const newResult = await fetcher$(store.currentPage + 1);
          const newMedia = newResult.movies.results || [];
          store.currentPage = newResult.movies.page || store.currentPage;
          store.results = [...store.results, ...newMedia];
        }}
      />
    </div>
  );
}

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
