import { MediaGrid } from "@modules/MediaGrid/MediaGrid";
import { getGenreList, getMediaByGenre } from "@services/tmdb";
import type { ProductionMedia } from "@services/types";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function TvGenrePage({
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

  const [tvShows, genres] = await Promise.all([
    getMediaByGenre({
      genre: parseResult.data.genreId,
      media: "tv",
      page: parseResult.data.page,
    }),
    getGenreList({ media: "tv" }),
  ]);

  const genre = genres.find((genre) => genre.id === parseResult.data.genreId);

  const location = useLocation();

  const fetcher = async (page: number) => {
    const params = new URLSearchParams({ page: String(page) });
    const url = `${location.href}/api?${params}`;
    const response = await fetch(url);
    return response.json();
  };

  const store = useStore({
    currentPage: 1,
    results: [] as ProductionMedia[],
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="px-8 pt-4 text-4xl">{`Tv Show Genre: ${genre?.name}`}</h1>
      <MediaGrid
        collection={[...(tvShows.results || []), ...store.results]}
        currentPage={store.currentPage}
        pageCount={tvShows?.total_pages || 1}
        parentContainer={container.value}
        onMore={async () => {
          const newResult = await fetcher(store.currentPage + 1);
          const newMedia = newResult.tvShows.results || [];
          store.currentPage = newResult.tvShows.page || store.currentPage;
          store.results = [...store.results, ...newMedia];
        }}
      />
    </div>
  );
}
