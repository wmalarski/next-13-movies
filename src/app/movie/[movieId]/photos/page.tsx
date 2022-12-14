import { getImage, getImageSet } from "@services/images";
import { getMovie } from "@services/tmdb";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function MoviePhotosPage({
  params,
}: {
  params: { movieId: string };
}) {
  const parseResult = z
    .object({ movieId: z.coerce.number().min(0).step(1) })
    .safeParse({ movieId: params.movieId });

  if (!parseResult.success) {
    notFound();
  }

  const movie = await getMovie({ id: parseResult.data.movieId });

  return (
    <section className="flex flex-col gap-8 px-16 py-4">
      <div className="flex items-end gap-4">
        <h2 className="text-2xl">Backdrops</h2>
        <span className="text-sm opacity-80">
          {movie.images?.backdrops?.length || 0} Images
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-6">
        {movie.images?.backdrops?.map((backdrop) => (
          <img
            key={backdrop.file_path}
            alt={`${movie.title} backdrop`}
            src={getImage(backdrop, "92")}
            srcSet={getImageSet(backdrop, "500")}
            style={{ aspectRatio: backdrop.aspect_ratio }}
            className="h-full max-h-full w-full object-cover"
          />
        ))}
      </div>
      <div className="flex items-end gap-4">
        <h2 className="text-2xl">Posters</h2>
        <span className="text-sm opacity-80">
          {movie.images?.posters?.length || 0} Images
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
        {movie.images?.posters?.map((poster) => (
          <img
            key={poster.file_path}
            alt={`${movie.title} poster`}
            src={getImage(poster, "92")}
            srcSet={getImageSet(poster, "342")}
            className="h-full max-h-full w-full object-cover"
            style={{ aspectRatio: poster.aspect_ratio }}
          />
        ))}
      </div>
    </section>
  );
}
