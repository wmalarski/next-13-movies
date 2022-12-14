import { getMovie } from "@services/tmdb";
import Image from "next/image";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function MovieVideosPage({
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
    <section className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6 px-16 py-4">
      {movie.videos?.results?.map((video) => (
        <a
          key={video.id}
          className="aspect-video"
          href={`https://www.youtube.com/watch?v=${video.key}`}
          target="_none"
        >
          <Image
            alt={video.name || ""}
            src={`https://movies-proxy.vercel.app/ipx/f_webp,s_400x600/youtube/vi/${video.key}/maxresdefault.jpg`}
            className="h-full max-h-full w-full object-cover"
            width={400}
            height={600}
          />
          <div className="mt-2 flex flex-col gap-2">
            <span>{video.name}</span>
            <span className="op-60 text-sm">{video.type}</span>
          </div>
        </a>
      ))}
    </section>
  );
}
