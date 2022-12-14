import { getMovies, getTrendingMovie } from "@services/tmdb";
import { getListItem } from "@utils/format";
import { notFound } from "next/navigation";
import { z } from "zod";
import { CategoryGrid } from "./CategoriesGrid/CategoriesGrid";

export default async function MovieCategoryPage({
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

  const movies =
    name === "trending"
      ? await getTrendingMovie({ page: 1 })
      : await getMovies({ page: 1, query: name });

  return (
    <div className="max-h-screen overflow-y-scroll flex flex-col">
      <h1 className="px-8 pt-4 text-4xl">
        {getListItem({ query: name, type: "movie" })}
      </h1>
      <div>
        <CategoryGrid collection={movies} />
      </div>
    </div>
  );
}
