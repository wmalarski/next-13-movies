import { MovieInfoCard } from "@modules/MovieInfoCard/MovieInfoCard";
import { PersonCarousel } from "@modules/PersonCarousel/PersonCarousel";

export default function MoviePage() {
  return (
    <div className="flex flex-col">
      <MovieInfoCard media={data} />
      <PersonCarousel collection={data.credits?.cast || []} title="Cast" />
    </div>
  );
}

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
