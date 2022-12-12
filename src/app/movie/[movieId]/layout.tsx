import { Slot, useContextProvider } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { MovieHero } from "@modules/MovieHero/MovieHero";
import { getMovie } from "@services/tmdb";
import { paths } from "@utils/paths";
import clsx from "clsx";
import { notFound } from "next/navigation";
import { z } from "zod";
import { MovieResourceContext } from "./context";

export default async function MovieLayout() {
  const parseResult = z
    .object({ movieId: z.number().min(0).step(1) })
    .safeParse({ movieId: +event.params.movieId });

  if (!parseResult.success) {
    notFound();
  }

  try {
    const movie = await getMovie({ id: parseResult.data.movieId });
  } catch {
    notFound();
  }
  const location = useLocation();

  useContextProvider(MovieResourceContext, resource);

  const overviewHref = paths.media("movie", +location.params.movieId);
  const videoHref = paths.movieVideo(+location.params.movieId);
  const photosHref = paths.moviePhotos(+location.params.movieId);

  return (
    <div className="flex flex-col gap-4">
      <MovieHero media={movie} />
      <div className="flex flex-row items-center justify-center gap-4">
        <a
          href={overviewHref}
          className={clsx(
            "transition-text p-2 text-xl uppercase opacity-70 duration-100 ease-in-out hover:opacity-100",
            {
              "border-b-2 border-b-white opacity-100":
                overviewHref === location.pathname,
            }
          )}
        >
          Overview
        </a>
        <a
          href={videoHref}
          className={clsx(
            "transition-text p-2 text-xl uppercase opacity-70 duration-100 ease-in-out hover:opacity-100",
            {
              "border-b-2 border-b-white opacity-100":
                videoHref === location.pathname,
            }
          )}
        >
          Videos
        </a>
        <a
          href={photosHref}
          className={clsx(
            "transition-text p-2 text-xl uppercase opacity-70 duration-100 ease-in-out hover:opacity-100",
            {
              "border-b-2 border-b-white opacity-100":
                photosHref === location.pathname,
            }
          )}
        >
          Photos
        </a>
      </div>
      <Slot />
    </div>
  );
}
