import { Resource, useContext } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { MovieInfoCard } from "@modules/MovieInfoCard/MovieInfoCard";
import { PersonCarousel } from "@modules/PersonCarousel/PersonCarousel";
import { MovieResourceContext } from "../context";

export default () => {
  const resource = useContext(MovieResourceContext);

  return (
    <Resource
      value={resource}
      onPending={() => <div className="h-screen" />}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <flex className="flex flex-col">
          <MovieInfoCard media={data} />
          <PersonCarousel collection={data.credits?.cast || []} title="Cast" />
        </flex>
      )}
    />
  );
};

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
