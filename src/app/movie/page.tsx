import { Footer } from "@modules/Footer/Footer";
import { MediaCarousel } from "@modules/MediaCarousel/MediaCarousel";
import { MovieHero } from "@modules/MovieHero/MovieHero";
import { getMovie, getMovies, getRandomMedia } from "@services/tmdb";
import { getListItem } from "@utils/format";
import { paths } from "@utils/paths";

export default async function MoviesPage() {
  const [popular, topRated, nowPlaying] = await Promise.all([
    getMovies({ page: 1, query: "popular" }),
    getMovies({ page: 1, query: "top_rated" }),
    getMovies({ page: 1, query: "now_playing" }),
  ]);

  const random = getRandomMedia({
    collections: [popular, topRated, nowPlaying],
  });

  const featured = await getMovie({ id: random.id });

  return (
    <div className="max-h-screen overflow-y-scroll flex flex-col gap-4">
      {featured ? (
        <a href={paths.media("movie", featured?.id)}>
          <MovieHero media={featured} />
        </a>
      ) : null}
      <MediaCarousel
        collection={popular?.results || []}
        title={getListItem({ query: "popular", type: "movie" })}
        viewAllHref={paths.movieCategory("popular")}
      />
      <MediaCarousel
        collection={topRated?.results || []}
        title={getListItem({ query: "top_rated", type: "movie" })}
        viewAllHref={paths.movieCategory("top_rated")}
      />
      <MediaCarousel
        collection={nowPlaying?.results || []}
        title={getListItem({ query: "now_playing", type: "movie" })}
        viewAllHref={paths.movieCategory("now_playing")}
      />
      <Footer />
    </div>
  );
}
