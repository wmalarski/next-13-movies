import { Resource, useContext } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { MovieInfoCard } from "@modules/MovieInfoCard/MovieInfoCard";
import { PersonCarousel } from "@modules/PersonCarousel/PersonCarousel";
import { MovieResourceContext } from "../context";

export default function MoviePage() {
  const resource = useContext(MovieResourceContext);

  return (
    <Resource
      value={resource}
      onPending={() => <div className="h-screen" />}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <div className="flex flex-col">
          <MovieInfoCard media={data} />
          <PersonCarousel collection={data.credits?.cast || []} title="Cast" />
        </div>
      )}
    />
  );
}

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
