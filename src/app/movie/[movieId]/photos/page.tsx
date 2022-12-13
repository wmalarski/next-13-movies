import { getImage, getImageSet } from "@services/images";

export default function MoviePhotosPage() {
  return (
    <section className="flex flex-col gap-8 px-16 py-4">
      <div className="flex items-end gap-4">
        <h2 className="text-2xl">Backdrops</h2>
        <span className="text-sm opacity-80">
          {images?.backdrops?.length || 0} Images
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-6">
        {images?.backdrops?.map((backdrop) => (
          <img
            key={backdrop.id}
            alt={`${title} backdrop`}
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
          {images?.posters?.length || 0} Images
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
        {images?.posters?.map((poster) => (
          <img
            key={poster.id}
            alt={`${title} poster`}
            src={getImage(poster, "92")}
            srcSet={getImageSet(poster, "342")}
            className="h-full max-h-full w-full object-cover"
            style={{ "aspect-ratio": poster.aspect_ratio }}
          />
        ))}
      </div>
    </section>
  );
}
