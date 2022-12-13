import { MovieHero } from "@modules/MovieHero/MovieHero";
import { getMovie } from "@services/tmdb";
import { paths } from "@utils/paths";
import clsx from "clsx";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { ReactNode } from "react";
import { z } from "zod";

export default async function MovieLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { movieId: string };
}) {
  const parseResult = z
    .object({ movieId: z.coerce.number().min(0).step(1) })
    .safeParse({ movieId: params.movieId });

  if (!parseResult.success) {
    notFound();
  }

  const pathname = usePathname();
  const movieId = parseResult.data.movieId;
  const movie = await getMovie({ id: parseResult.data.movieId });

  const overviewHref = paths.media("movie", movieId);
  const videoHref = paths.movieVideo(movieId);
  const photosHref = paths.moviePhotos(movieId);

  return (
    <div className="flex flex-col gap-4">
      <MovieHero media={movie} />
      <div className="flex flex-row items-center justify-center gap-4">
        <Link
          href={overviewHref}
          className={clsx(
            "transition-text p-2 text-xl uppercase opacity-70 duration-100 ease-in-out hover:opacity-100",
            {
              "border-b-2 border-b-white opacity-100":
                overviewHref === pathname,
            }
          )}
        >
          Overview
        </Link>
        <Link
          href={videoHref}
          className={clsx(
            "transition-text p-2 text-xl uppercase opacity-70 duration-100 ease-in-out hover:opacity-100",
            { "border-b-2 border-b-white opacity-100": videoHref === pathname }
          )}
        >
          Videos
        </Link>
        <Link
          href={photosHref}
          className={clsx(
            "transition-text p-2 text-xl uppercase opacity-70 duration-100 ease-in-out hover:opacity-100",
            { "border-b-2 border-b-white opacity-100": photosHref === pathname }
          )}
        >
          Photos
        </Link>
      </div>
      {children}
    </div>
  );
}
