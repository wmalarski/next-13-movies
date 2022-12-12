import { MediaCarousel } from "@modules/MediaCarousel/MediaCarousel";
import { MovieHero } from "@modules/MovieHero/MovieHero";
import { TvHero } from "@modules/TvHero/TvHero";
import {
  getMovie,
  getRandomMedia,
  getTrendingMovie,
  getTrendingTv,
  getTvShow,
} from "@services/tmdb";
import type { ProductionMedia } from "@services/types";
import { getListItem } from "@utils/format";
import { paths } from "@utils/paths";

export default async function HomePage() {
  const [movies, tv] = await Promise.all([
    getTrendingMovie({ page: 1 }),
    getTrendingTv({ page: 1 }),
  ]);

  const random = getRandomMedia<ProductionMedia>({
    collections: [movies, tv],
  });

  const featuredTv =
    random.media_type === "tv" ? await getTvShow({ id: random.id }) : null;

  const featuredMovie =
    random.media_type === "movie" ? await getMovie({ id: random.id }) : null;

  return (
    <div className="flex flex-col gap-4">
      {featuredTv ? (
        <a href={paths.media("tv", featuredTv.id)}>
          <TvHero media={featuredTv} />
        </a>
      ) : null}
      {featuredMovie ? (
        <a href={paths.media("movie", featuredMovie.id)}>
          <MovieHero media={featuredMovie} />
        </a>
      ) : null}
      <MediaCarousel
        collection={movies?.results || []}
        title={getListItem({ query: "trending", type: "movie" })}
        viewAllHref={paths.movieCategory("trending")}
      />
      <MediaCarousel
        collection={tv?.results || []}
        title={getListItem({ query: "trending", type: "tv" })}
        viewAllHref={paths.tvCategory("trending")}
      />
    </div>
  );
}

export const head: DocumentHead = {
  meta: [
    {
      content: "Qwik City Movies - real app example using Qwik-City",
      name: "description",
    },
  ],
  title: "Qwik City Movies",
};
