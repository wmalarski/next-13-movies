import { Resource } from "@builder.io/qwik";
import { useEndpoint, type DocumentHead } from "@builder.io/qwik-city";
import { MediaCarousel } from "@modules/MediaCarousel/MediaCarousel";
import { MovieHero } from "@modules/MovieHero/MovieHero";
import { TvHero } from "@modules/TvHero/TvHero";
import type { ProductionMedia } from "@services/types";
import { getListItem } from "@utils/format";
import { paths } from "@utils/paths";

export const onGet = async () => {
  const {
    getTrendingTv,
    getTrendingMovie,
    getRandomMedia,
    getMovie,
    getTvShow,
  } = await import("~/services/tmdb");

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

  return { featuredMovie, featuredTv, movies, tv };
};

export default function HomePage() {
  const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    <Resource
      value={resource}
      onPending={() => <div className="h-screen" />}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <div className="flex flex-col gap-4">
          {data.featuredTv ? (
            <a href={paths.media("tv", data.featuredTv.id)}>
              <TvHero media={data.featuredTv} />
            </a>
          ) : null}
          {data.featuredMovie ? (
            <a href={paths.media("movie", data.featuredMovie.id)}>
              <MovieHero media={data.featuredMovie} />
            </a>
          ) : null}
          <MediaCarousel
            collection={data.movies?.results || []}
            title={getListItem({ query: "trending", type: "movie" })}
            viewAllHref={paths.movieCategory("trending")}
          />
          <MediaCarousel
            collection={data.tv?.results || []}
            title={getListItem({ query: "trending", type: "tv" })}
            viewAllHref={paths.tvCategory("trending")}
          />
        </div>
      )}
    />
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
