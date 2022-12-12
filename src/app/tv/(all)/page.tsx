import { MediaCarousel } from "@modules/MediaCarousel/MediaCarousel";
import { TvHero } from "@modules/TvHero/TvHero";
import { getRandomMedia, getTvShow, getTvShows } from "@services/tmdb";
import { getListItem } from "@utils/format";
import { paths } from "@utils/paths";

export default async function AllTvPage() {
  const [popular, topRated, onTheAir, airingToday] = await Promise.all([
    getTvShows({ page: 1, query: "popular" }),
    getTvShows({ page: 1, query: "top_rated" }),
    getTvShows({ page: 1, query: "on_the_air" }),
    getTvShows({ page: 1, query: "airing_today" }),
  ]);

  const random = getRandomMedia({
    collections: [popular, topRated, onTheAir, airingToday],
  });

  const featured = await getTvShow({ id: random.id });

  return (
    <div className="flex flex-col gap-4">
      <a href={paths.media("tv", data.featured?.id)}>
        <TvHero media={data.featured} />
      </a>
      <MediaCarousel
        collection={data.popular?.results || []}
        title={getListItem({ query: "popular", type: "tv" })}
        viewAllHref={paths.tvCategory("popular")}
      />
      <MediaCarousel
        collection={data.topRated?.results || []}
        title={getListItem({ query: "top_rated", type: "tv" })}
        viewAllHref={paths.tvCategory("top_rated")}
      />
      <MediaCarousel
        collection={data.onTheAir?.results || []}
        title={getListItem({ query: "on_the_air", type: "tv" })}
        viewAllHref={paths.tvCategory("on_the_air")}
      />
      <MediaCarousel
        collection={data.airingToday?.results || []}
        title={getListItem({ query: "airing_today", type: "tv" })}
        viewAllHref={paths.tvCategory("airing_today")}
      />
    </div>
  );
}
