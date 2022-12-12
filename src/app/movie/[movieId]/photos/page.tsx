import { Resource, useContext } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { getImage, getImageSet } from "@services/images";
import { MovieResourceContext } from "../context";

export default () => {
  const resource = useContext(MovieResourceContext);

  return (
    <Resource
      value={resource}
      onPending={() => <div className="h-screen" />}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <section className="flex flex-col gap-8 px-16 py-4">
          <div className="flex items-end gap-4">
            <h2 className="text-2xl">Backdrops</h2>
            <span className="text-sm opacity-80">
              {data.images?.backdrops?.length || 0} Images
            </span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-6">
            {data.images?.backdrops?.map((backdrop) => (
              <img
                alt={`${data.title} backdrop`}
                src={getImage(backdrop, "92")}
                srcSet={getImageSet(backdrop, "500")}
                style={{ "aspect-ratio": backdrop.aspect_ratio }}
                className="h-full max-h-full w-full object-cover"
              />
            ))}
          </div>
          <div className="flex items-end gap-4">
            <h2 className="text-2xl">Posters</h2>
            <span className="text-sm opacity-80">
              {data.images?.posters?.length || 0} Images
            </span>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
            {data.images?.posters?.map((poster) => (
              <img
                alt={`${data.title} poster`}
                src={getImage(poster, "92")}
                srcSet={getImageSet(poster, "342")}
                className="h-full max-h-full w-full object-cover"
                style={{ "aspect-ratio": poster.aspect_ratio }}
              />
            ))}
          </div>
        </section>
      )}
    />
  );
};

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
