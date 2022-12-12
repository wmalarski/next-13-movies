import { MediaGrid } from "@modules/MediaGrid/MediaGrid";
import { getMovies, getTrendingMovie } from "@services/tmdb";
import type { ProductionMedia } from "@services/types";
import { getListItem } from "@utils/format";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function MovieCategory({
  params,
}: {
  params: { name: string };
}) {
  const parseResult = z
    .object({ name: z.string().min(1) })
    .safeParse({ name: params.name });

  if (!parseResult.success) {
    notFound();
  }

  const name = parseResult.data.name;

  try {
    const movies =
      name === "trending"
        ? await getTrendingMovie({ page: 1 })
        : await getMovies({ page: 1, query: name });
  } catch {
    notFound();
  }
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
    <div className="flex flex-col">
      <h1 className="px-8 pt-4 text-4xl">
        {getListItem({ query: location.params.name, type: "movie" })}
      </h1>
      <div>
        <MediaGrid
          collection={[...(data.results || []), ...store.results]}
          currentPage={store.currentPage}
          pageCount={data.total_pages || 1}
          parentContainer={container.value}
          onMore={async () => {
            const newResult = await fetcher(store.currentPage + 1);
            const newMedia = newResult.results || [];
            store.currentPage = newResult.page || store.currentPage;
            store.results = [...store.results, ...newMedia];
          }}
        />
      </div>
    </div>
  );
}
